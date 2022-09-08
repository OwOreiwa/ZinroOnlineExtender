(function($){
    window.addEventListener("load", function(){
        if (window.location.href == "https://zinro.net/m/end.php?ad=inter" ||
            window.location.href == "https://zinro.net/m/end.php?message=%E6%9D%91%E3%81%8B%E3%82%89%E9%80%80%E5%87%BA%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F")
        {
                window.location.href = "https://zinro.net/"
        }
    }, false);
    
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
        if (request == "Action") {
        }
    });

    const define = (name, value) => {
        Object.defineProperty(window, name, {
            value: value,
            writable: false,
        });
    }
    define('Spectator', '観戦者');
    define('M00001', '定員に達しました');

    function ajaxPlayers(){
        return $.ajax({
            url: "https://zinro.net/m/api/?mode=players",
            type: "GET",
            dataType: "json",
        });
    }

    function highlightDisconnectedPlayers(players){
        const $playerElements = $('#all_players').find('tr');

        const disconnectedConditions = player => {
            return      !player['is_active']
                    &&   player['job'] != Spectator
                    && !+player['is_cpu']
        };

        players.forEach((player, index) => {
            if (disconnectedConditions(player)) {
                $($playerElements[index + 1]).css({
                    'border': '2px solid red',
                    'opacity': '25%',
                });
            }
        });
    }

    function noticeReachedPlayersCapacity(room, players){
        const playersCapacity = room['teiin'];
        const currentPlayers = players.length;

        if (currentPlayers >= playersCapacity) {
            terminal.write(M00001);
        }
    }

    $(function(){
        // ページをクリックしたとき
        var flag = true;
        $('body').click(function(){
            const terminal = {
                element: $('#ZEX-terminal-body'),
                write(message) {
                    message = '<div>' + message + '</div>';
                    this.element.prepend(message);
                },
            }

            terminal.write('clicked!');

            // 初回のみ発動
            if (flag) {
                $('#all_players').find('table').css({
                    'border-collapse': 'collapse',
                });

                const terminalHTML  =   '<div id="ZEX-terminal">'
                                    +       '<div id="ZEX-terminal-head">TERMINAL</div>'
                                    +       '<div id="ZEX-terminal-body"></div>'
                                    +   '</div>'
                $('#all_players').before(terminalHTML);

                flag = false;
            }
        });

        // ページ内容が更新されたとき
        const observerConfig = {
            childList: true,
            subtree: true,
        }
        var observer = new MutationObserver(() => {
            ajaxPlayers()
            .done(function(data){
                const json = JSON.parse(JSON.stringify(data));
                const playersJson = json['players'];
                const roomJson = json['room'];
                console.table(playersJson);
                console.table(roomJson);

                const players = Object.keys(playersJson).map(key => playersJson[key]);
                const room = Object.keys(roomJson).map(key => roomJson[key]);

                highlightDisconnectedPlayers(players);
                noticeReachedPlayersCapacity(room, players);
            });
        });
        observer.observe($('body')[0], observerConfig);
    });
})(window.jQuery);
