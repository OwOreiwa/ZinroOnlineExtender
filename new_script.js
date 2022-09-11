(function($){
    // 定数 ----------------------------------------------------------------------------------------------------
    const define = (name, value) => {
        Object.defineProperty(window, name, {
            value: value,
            writable: false,
        });
    }
    define('JOB_SPECTATOR', '観戦者');
    define('JOBSET_8CFO', {
        '人狼': 2,
        '占い師': 1,
        '霊能者': 1,
        '狂人': 1,
        '共有者': 2,
    });
    define('JOBSET_10A', {
        '人狼': 2,
        '占い師': 1,
        '狩人': 1,
        '霊能者': 1,
        '狂人': 1,
    });
    define('JOBSET_12A', {
        '人狼': 3,
        '占い師': 1,
        '狩人': 1,
        '霊能者': 1,
        '狂人': 1,
        '猫又': 1,
    });
    define('JOBSET_12B', {
        '人狼': 2,
        '占い師': 1,
        '狩人': 1,
        '霊能者': 1,
        '狂人': 1,
        '妖狐': 1,
    });
    define('JOBSET_14D', {
        '人狼': 3,
        '占い師': 1,
        '狩人': 1,
        '霊能者': 1,
        '狂信者': 1,
        '妖狐': 1,
        '背徳者': 1,
        '猫又': 1,
        '共有者': 2,
    });
    define('JOBSET_17A', {
        '人狼': 3,
        '占い師': 1,
        '狩人': 1,
        '霊能者': 1,
        '狂人': 1,
        '妖狐': 1,
        '共有者': 2,
    });
    define('JOBSET_HACHIWARI', {
        '人狼': 2,
        '占い師': 2,
        '狂人': 1,
        '怪盗': 1,
    });
    define('JOBSET_8PT3', {
        '人狼': 1,
        '占い師': 1,
        '狂人': 1,
        '妖狐': 1,
        '怪盗': 3,
    })
    define('JOBSET_10PT4', {
        '人狼': 1,
        '占い師': 1,
        '狩人': 1,
        '狂信者': 1,
        '妖狐': 1,
        '怪盗': 4,
    })
    define('JOBSET_12PT4', {
        '人狼': 1,
        '占い師': 1,
        '狩人': 1,
        '狂人': 1,
        '妖狐': 1,
        '恋人': 1,
        '怪盗': 4,
        '狼憑き': 1,
    })
    define('JOBSET_14PT5', {
        '人狼': 2,
        '占い師': 1,
        '狩人': 1,
        '狂人': 1,
        '妖狐': 1,
        '背徳者': 1,
        '恋人': 2,
        '怪盗': 5,
    })
    define('JOBSET_')
    define('ROLLCALL_INTERVAL', 30);
    define('URL_MAIN', 'https://zinro.net/');
    define('URL_PLAYER', 'https://zinro.net/m/player.php')
    define('URL_END_01', 'https://zinro.net/m/end.php?ad=inter');
    define('URL_END_02', 'https://zinro.net/m/end.php?message=%E6%9D%91%E3%81%8B%E3%82%89%E9%80%80%E5%87%BA%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F');
    define('URL_API', 'https://zinro.net/m/api/');
    define('URL_API_PLAYERS', 'https://zinro.net/m/api/?mode=players');
    define('SYMBOL_PLUS', '＋');
    define('SYMBOL_MINUS', '－');
    define('SYMBOL_CIRCLE', '〇');
    define('SYMBOL_CROSS', '×');
    define('HTML_TERMINAL', '<div class="ZEX" id="ZEX-terminal">'
                                    +       '<div id="ZEX-terminal-head">ターミナル</div>'
                                    +       '<div id="ZEX-terminal-body"></div>'
                                    +   '</div>');
    define('HTML_JOBSET', '<div class="ZEX" id="ZEX-jobset">'
                                    +       '<div id="ZEX-jobset-head">配役設定</div>'
                                    +       '<div id="ZEX-jobset-body"></div>'
                                    + '</div>')

    const OBSERVER_CONFIG = {
        childList: true,
        subtree: true,
    }
    const OBSERVER = new MutationObserver(() => {
        observerFunction();
    });
    const isntActive = player => {
        return !player['is_active'];
    }
    const isntSpectator = player => {
        return player['job'] != JOB_SPECTATOR;
    }
    const isntCPU = player => {
        return !+player['is_cpu'];
    }
    const isGM = (player, room) => {
        return player['name'] === room['gm'];
    }
    const JOB_NAME = {
        1: '人狼',
        2: '',
        3: '狩人',
        4: '占い師',
        5: '霊能者',
        6: '狂人',
        7: '狂信者',
        8: '妖狐',
        9: '背徳者',
        10: '猫又',
        11: '共有者',
        12: '役人',
        13: '怪盗',
        14: '狼憑き',
        15: 'ものまね',
        16: 'てるてる',
        17: '恋人',
        18: 'パン屋',
        19: '黒猫',
    }
    const appendButtonTo = (element, title, func, doesApplyStyle = true) => {
        return $('<button>', {
            type: 'button',
        }).css({
            width: doesApplyStyle ? '55px' : '',
        }).text(title).click(func).appendTo(element);
    }

    // グローバル変数 ----------------------------------------------------------------------------------------------------
    var currentPlayers = 1;
    var beforePlayers = 0;
    var isReached = false;

    // アクション ----------------------------------------------------------------------------------------------------
    window.addEventListener("load", function(){
        if (window.location.href == URL_END_01 ||
            window.location.href == URL_END_02)
        {
                window.location.href = URL_MAIN;
        }
    }, false);

    // クラス ----------------------------------------------------------------------------------------------------
    class Terminal {
        constructor() {
            this.element = $('#ZEX-terminal-body');
        }
        write = (message, addClass = '', symbol = '　') => {
            OBSERVER.disconnect();

            const now = new Date();
            const h = now.getHours().toString().padStart(2, '0');
            const m = now.getMinutes().toString().padStart(2, '0');
            const s = now.getSeconds().toString().padStart(2, '0');
            const time = `${h}:${m}:${s}`;
            const timeElement = $('<span>', {
                class: 'time',
                text: time,
            });
            const messageElement = $('<span>', {
                class: 'message',
                text: symbol + ' ' + message,
            });
            const elements = $('<div>', {
                class: addClass,
            });

            this.element.append(elements);
            $(elements).append(timeElement);
            $(elements).append(messageElement);

            this.element[0].scrollTo(0, this.element[0].scrollHeight);

            this.groupByTime();

            OBSERVER.observe($('body')[0], OBSERVER_CONFIG);
        }
        groupByTime = () => {
            const messages = $(this.element).children();
            const $lastMessage = $(messages[messages.length - 1]);
            const $secondToLastMessage = $(messages[messages.length - 2]);

            if ($lastMessage.find('.time').html() == $secondToLastMessage.find('.time').html()) {
                $lastMessage.find('.time').css({
                    'opacity': '25%',
                });
            }
        }
        clear = () => {
            OBSERVER.disconnect();

            this.element.empty();
            this.write('ターミナルをクリアしました', 'important');

            OBSERVER.observe($('body')[0], OBSERVER_CONFIG);
        }
    }

    // 関数 ----------------------------------------------------------------------------------------------------
    /**
     * オブザーバに設定する関数
     * @param isFirstRun 初回起動か
     * @returns {*} レスポンス
     */
    function observerFunction(isFirstRun = false){
        return ajax(URL_API_PLAYERS, !isFirstRun)
            .done(result => {
                if (!isFirstRun) {
                    const json = JSON.parse(JSON.stringify(result));
                    const playersJson = json['players'];
                    const playerJson = json['player'];
                    const roomJson = json['room'];
                    const players = Object.keys(playersJson).map(key => playersJson[key]);

                    addClassToPlayers(players);
                    isReached = noticeReachedPlayersCapacity(players, roomJson, isReached);
                }
            });
    }

    /**
     * リクエスト先からJSONを取得
     * @param URL リクエスト先
     * @param async 非同期で行うか
     */
    function ajax(URL, async = true) {
        return $.ajax({
            url: URL,
            type: 'GET',
            dataType: 'json',
            async: async,
        });
    }

    /**
     * メッセージを送信
     * @param playerJson プレイヤー情報(JSON)
     * @param message メッセージ
     */
    function sendMessage(playerJson, message) {
        const terminal = new Terminal();

        $.ajax({
            url: URL_API,
            type: 'POST',
            data: {
                'mode': 'post_message',
                'message': message,
            },
        });

        terminal.write(`メッセージを送信: ${message}`);

        const messages = getMessages();
        const yourMessages = messages.filter(message => message['from_user'] === playerJson['name']);
        if (yourMessages[yourMessages.length - 1]['message'] === message) {
            terminal.write('メッセージの送信に失敗しました', 'error', SYMBOL_CROSS);
        }
        else {
            terminal.write('メッセージの送信に失敗しました', 'success', SYMBOL_CIRCLE);
        }
    }

    /**
     * プレイヤーの状態に応じてクラスを付与
     * @param players 観戦者含むプレイヤー情報
     */
    function addClassToPlayers(players){
        const $playerElements = $('#all_players').find('tr');

        players.forEach((player, index) => {
            if (isntActive(player) && isntSpectator(player) && isntCPU(player)) {
                $($playerElements[index + 1]).addClass('inactive');
            }
            else if (!isntSpectator(player) && isntCPU(player)) {
                $($playerElements[index + 1]).addClass('spectator')
                    .find('span').css({
                        'color': '',
                    });
            }
        });
    }

    /**
     * プレイヤーが入室あるいは退室したとき、ターミナルに通知
     * @param beforePlayers プレイヤー入室/退室前のプレイヤー情報
     * @param currentPlayers 現在のプレイヤー情報
     */
    function noticePlayerJoinOrLeave(beforePlayers, currentPlayers){
        const terminal = new Terminal();

        // 人数が減った時
        if (beforePlayers < currentPlayers) {
            currentPlayers.map(afterPlayer => {
                for (let i = 0; i < beforePlayers.length; i++) {
                    if (afterPlayer['id'] == beforePlayers[i]['id']) {
                        break;
                    }
                    if (i == beforePlayers.length - 1) {
                        terminal.write(`プレイヤーが入室: ${afterPlayer['name']}`, 'server', SYMBOL_PLUS);
                    }
                }
            });
        }
        // 人数が増えた時
        else if (beforePlayers > currentPlayers) {
            beforePlayers.map(beforePlayer => {
                for (let i = 0; i < currentPlayers.length; i++) {
                    if (beforePlayer['id'] == currentPlayers[i]['id']) {
                        break;
                    }
                    if (i == currentPlayers.length - 1) {
                        terminal.write(`プレイヤーが退室: ${beforePlayer['name']}`, 'server', SYMBOL_MINUS);
                    }
                }
            });
        }
    }

    /**
     * 現在のプレイヤー数が定員に達したとき、ターミナルに通知
     * @param players 観戦者含むプレイヤー情報
     * @param roomJson ルーム情報(JSON)
     * @param isReached 定員に達しているか
     */
    function noticeReachedPlayersCapacity(players, roomJson, isReached){
        const terminal = new Terminal();

        currentPlayers = players.filter(player => isntSpectator(player));
        const playersCapacity = roomJson['teiin'];

        // 人数が変化した時
        if (currentPlayers.length != beforePlayers.length) {
            noticePlayerJoinOrLeave(beforePlayers, currentPlayers);

            isReached &&= false;
            terminal.write(`現在のプレイヤー数: ${currentPlayers.length} / ${playersCapacity}`);
        }

        if (currentPlayers.length >= playersCapacity) {
            if (!isReached) {
                isReached = true;
                terminal.write('現在のプレイヤー数が定員に達しました', 'important');
            }
        }

        beforePlayers = currentPlayers;
        return isReached;
    }

    /**
     * 役職設定を取得
     * @param roomJson ルーム情報(JSON)
     * @returns {any[]} 役職設定情報
     */
    function getJobset(roomJson){
        let jobset = roomJson['jobset'].split(',');
        let jobsetMap = new Array();
        jobset.forEach(job => {
            jobsetMap[job.split('-')[0]] = job.split('-')[1];
        });
        return jobsetMap;
    }

    /**
     * 役職を設定
     * @param jobsetMap 役職設定情報
     */
    function setJobset(jobsetMap){
        $('input[data-type=job]').get().forEach(element => {
            $(element).val(jobsetMap[$(element).attr('data-name')]);
        })
    }

    /**
     * 役職設定フォームを置換
     * @param roomJson ルーム情報(JSON)
     */
    function replaceJobsetForm(roomJson) {
        for(let i = 1; i <= 19; i++) {
            const $beforeElement = $(`select[name=job_${i}]`);
            const afterElement = $('<input>', {
                type: 'number',
                name: `job_${i}`,
                'data-name': JOB_NAME[i],
                'data-type': 'job',
                style: 'width: 40px; margin-bottom: 0',
            })
            const jobsetMap = getJobset(roomJson);
            afterElement.val(jobsetMap[afterElement.attr('data-name')]);
            $beforeElement.after(afterElement);
            $beforeElement.remove();
        }
    }

    /**
     * 役職設定ボタンを追加
     */
    function addJobsetButton() {
        const $jobsetBody = $('#ZEX-jobset-body');
        appendButtonTo($jobsetBody, '10a狩', () => setJobset(JOBSET_10A));
        appendButtonTo($jobsetBody, '12a猫', () => setJobset(JOBSET_12A));
        appendButtonTo($jobsetBody, '14d猫', () => setJobset(JOBSET_14D));
        $('#ZEX-jobset-body > button').wrapAll('<div>');
        appendButtonTo($jobsetBody, '8cfo', () => setJobset(JOBSET_8CFO));
        appendButtonTo($jobsetBody, '12b', () => setJobset(JOBSET_12B));
        appendButtonTo($jobsetBody, '17a', () => setJobset(JOBSET_17A));
        $('#ZEX-jobset-body > button').wrapAll('<div>');
        appendButtonTo($jobsetBody, '八割', () => setJobset(JOBSET_HACHIWARI));
        appendButtonTo($jobsetBody, '8怪3', () => setJobset(JOBSET_8PT3));
        appendButtonTo($jobsetBody, '10怪4', () => setJobset(JOBSET_10PT4));
        appendButtonTo($jobsetBody, '12怪4', () => setJobset(JOBSET_12PT4));
        appendButtonTo($jobsetBody, '14怪5', () => setJobset(JOBSET_14PT5));
        $('#ZEX-jobset-body > button').wrapAll('<div>');
    }

    /**
     * 役職設定入出力ボタンを追加
     * @param roomJson ルーム情報(JSON)
     */
    function addImportAndExportJobsetButton(roomJson) {
        const $jobsetBody = $('#ZEX-jobset-body');
        $('<input>', {
            id: 'ZEX-jobset-import-data',
            style: 'width: 99%;',
        }).appendTo($jobsetBody);
        $('#ZEX-jobset-body > input').wrapAll('<div>');
        appendButtonTo($jobsetBody, 'エクスポート', () => {
            $('#ZEX-jobset-import-data').val(roomJson['jobset']);
            $('#ZEX-jobset-import-data').select();
            document.execCommand('copy');
        }, false);
        appendButtonTo($jobsetBody, 'インポート', () => {
            const tmp = new Object();
            tmp['jobset'] = $('#ZEX-jobset-import-data').val();
            setJobset(getJobset(tmp));
            $('#ZEX-jobset-import-data').val('');
        }, false);
        $('#ZEX-jobset-body > button').wrapAll('<div>');
    }

    /**
     * 現在のルームの全てのメッセージを取得
     * @returns {any} メッセージ情報
     */
    function getMessages(){
        return JSON.parse(localStorage.getItem('message'));
    }

    // 実行 ----------------------------------------------------------------------------------------------------
    $(function(){
        new Promise(resolve => {
           setTimeout(() => {
               const response = observerFunction(true);
               const json = response['responseJSON'];
               const playersJson = json['players'];
               const playerJson = json['player'];
               const roomJson = json['room'];
               const players = Object.keys(playersJson).map(key => playersJson[key]);

               // 新しい要素を追加
               $('#all_players').before(HTML_TERMINAL);
               const terminal = new Terminal();
               // GMのとき
               if (isGM(playerJson, roomJson)) {
                   $('input[value=村設定変更]').parent().before(HTML_JOBSET);
                   addJobsetButton();
                   addImportAndExportJobsetButton(roomJson);
                   replaceJobsetForm(roomJson);
               }

               // イベント追加
               $('#ZEX-terminal-head').on('click', () => {
                   terminal.clear();
               });

               addClassToPlayers(players);
               isReached = noticeReachedPlayersCapacity(players, roomJson, isReached);

               resolve();
           }, 300);
        }).then(() => {
            OBSERVER.observe($('body')[0], OBSERVER_CONFIG);
        });
    });
})(window.jQuery);
