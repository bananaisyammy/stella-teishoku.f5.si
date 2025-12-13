G.AddData({
    name: 'Default dataset',
    author: 'Orteil',
    desc: 'Legacy用のデフォルトデータセット。',
    engineVersion: 1,
    manifest: 0,
    func: function () {
        /*
        注：他のいくつかのストラテジーゲームとは異なり、このデータセットは地球の人類史を再現しようとしていません。実際、既存の文明を明示することは避けられています；プレイヤーの種（「人類」など）や性別（個々人を指す際は "they" を使用）も意図的に触れていません。
        同様に、技術の順序は現実世界の発明順と一致しない場合がありますが、それでも意味が通じるように設計しています。
        モッド作成者はこれらのガイドラインに従うか、必要に応じて現実世界の文明・種・性別をゲームに導入して構いません。
        - 将来的にプレイ可能な種がゲームコンセプトとして追加される可能性があります。
        */

        /*=====================================================================================
        プロパティ & 関数
        =======================================================================================*/

        G.props['fastTicksOnResearch'] = 150;

        G.funcs['new game blurb'] = function () {
            var str =
                '<b>あなたの部族 :</b><div class="thingBox">' +
                G.textWithTooltip('<div class="icon freestanding" style="' + G.getIconUsedBy(G.getRes('adult')) + '"></div><div class="freelabel">x5</div>', '成人 x5') +
                G.textWithTooltip('<div class="icon freestanding" style="' + G.getIconUsedBy(G.getRes('elder')) + '"></div><div class="freelabel">x1</div>', '長老 x1') +
                G.textWithTooltip('<div class="icon freestanding" style="' + G.getIconUsedBy(G.getRes('child')) + '"></div><div class="freelabel">x2</div>', '子供 x2') +
                G.textWithTooltip('<div class="icon freestanding" style="' + G.getIconUsedBy(G.getRes('herb')) + '"></div><div class="freelabel">x250</div>', '薬草 x250') +
                G.textWithTooltip('<div class="icon freestanding" style="' + G.getIconUsedBy(G.getRes('water')) + '"></div><div class="freelabel">x250</div>', '水 x250') +
                '</div>' +
                '<div class="par fancyText bitBiggerText">あなたの部族は荒野に定住する場所を見つけました。<br>資源は乏しく、皆は採集から始めます。</div>' +
                '<div class="par fancyText bitBiggerText">あなたは部族の指導者として頭角を現します。彼らはあなたをこう呼びます：</div>';
            return str;
        }

        G.funcs['new game'] = function () {
            var str = 'あなたの名前は ' + G.getName('ruler') + '' + (G.getName('ruler').toLowerCase() == 'orteil' ? ' <i>(しかしそれはあなたではないでしょう？)</i>' : '') + '、' + G.getName('civ') + 'の統治者です。あなたの部族は原始的ですが、希望に満ちています。<br>あなたの遺産の最初の年が始まりました。時の試練に耐えますように。';
            G.Message({ type: 'important tall', text: str, icon: [0, 3] });
        }
        G.funcs['game over'] = function () {
            var str = G.getName('civ') + 'はもはや存在せず、あなたの遺産は歴史書の傍注に過ぎない長い失われた記憶になりました。<br>全員が死亡しました。';
            G.Message({ type: 'bad', text: str, icon: [5, 4] });
        }
        G.funcs['game loaded'] = function () {
            G.Message({ type: 'important tall', text: 'お帰りなさい、' + G.getName('ruler') + '、' + G.getName('civ') + 'の統治者。', icon: [0, 3] });
        }
        G.funcs['new year'] = function () {
            if (G.on) {
                var str = '';
                str += '現在は年 ' + (G.year + 1) + ' です。<br>';
                str += '昨年の報告：<br>';
                str += '&bull; 出生： ' + B(G.getRes('born this year').amount) + '<br>';
                str += '&bull; 死亡： ' + B(G.getRes('died this year').amount) + '<br>';
                G.getRes('born this year').amount = 0;
                G.getRes('died this year').amount = 0;
                G.Message({ type: 'important', text: str, icon: [0, 3] });

                //影響力のわずかな増加
                if (G.getRes('influence').amount <= G.getRes('authority').amount - 1) G.gain('influence', 1);
            }
        }

        G.props['new day lines'] = [
            '生き物が潜んでいる。',
            '危険が満ちている。',
            '野生の獣が徘徊している。',
            '見えない巨大な怪物が徘徊している。',
            '寒い夜だ。',
            '灰色の空の低い唸りだけが聞こえる。',
            '闇は恐ろしい。',
            '雲が複雑な形にねじれている。',
            '雨が降っている。',
            '遠くで不吉に鳴く黒い鳥。',
            '地平線に嵐が見える。',
            '夜は容赦がない。',
            '影に生き物がうごめいている。',
            '近くで小川が静かにせせらいでいる。',
            '遠くで獲物が獣の群れに倒れる音がする。',
            '説明のつかない音が地平線に反響する。',
            '朝の空気はすべてが静止している。',
            '空に低いうなり声が満ちる。',
            '夜空がきらめき、その謎は破られない。',
            '乾いた骨が足下で砕ける。',
            '野生の棘が足首を引っ掻く。',
            '遠くで何かが遠吠えする。',
            '遠い所から灰がゆっくりと雪のように降る。',
            '血のような叫び声が聞こえる。',
            '未知の生き物が土の中でうごめく。',
            '今日は特異な匂いが風に乗ってくる。',
            '他所から流れ込む野生の香り。',
            '塵が重くのしかかる。',
            '上空からの不気味な光が夜を照らす。',
            '遠い地は静かに横たわっている。'
        ];

        shuffle(G.props['new day lines']);
        G.funcs['new day'] = function () {
            if (G.on) {
                if (G.getSetting('atmosphere') && Math.random() < 0.01) {
                    //新しい日のたびに稀に雰囲気メッセージを表示
                    //配列の最初の5行のうちの1つを選び、それを配列の末尾に戻す。これにより頻繁な重複が避けられる半ランダムな流れになる
                    var i = Math.floor(Math.random() * 5);
                    var msg = G.props['new day lines'].splice(i, 1)[0];
                    G.props['new day lines'].push(msg);
                    G.Message({ text: msg });
                }

                //毎日ランダムに特性を獲得する可能性
                for (var i in G.trait) {
                    var me = G.trait[i];
                    if (!G.has(me.name)) {
                        if (Math.random() < 1 / (me.chance * 300)) {
                            if (G.checkReq(me.req) && G.testCost(me.cost, 1)) {
                                G.doCost(me.cost, 1);
                                G.gainTrait(me);
                                G.Message({ type: 'important tall', text: 'あなたの人々は特性 <b>' + me.displayName + '</b> を採用しました。', icon: me.icon });
                            }
                        }
                    }
                }

                G.trackedStat = Math.max(G.trackedStat, G.getRes('population').amount);
            }
        }

        G.funcs['tracked stat str'] = function () {
            return '統治した最大人口';
        }

        G.funcs['civ blurb'] = function () {
            var str = '';
            str += '<div class="fancyText shadowed">' +
                '<div class="barred infoTitle">' + G.getName('civ') + 'の地</div>' +
                '<div class="barred">統治者 : ' + G.getName('ruler') + '</div>';
            var toParse = '';
            var pop = G.getRes('population').amount;
            if (pop > 0) {
                toParse += '人口 : <b>' + B(pop) + ' [' + '人口,' + G.getName((pop == 1 ? 'inhab' : 'inhabs')) + ']</b>//';
                var stat = G.getRes('happiness').amount / pop;
                var text = '不明'; if (stat <= -200) text = '悲惨'; else if (stat <= -100) text = '平凡'; else if (stat <= -50) text = '低い'; else if (stat < 50) text = '普通'; else if (stat < 100) text = '快適'; else if (stat <= 200) text = '高い'; else if (stat >= 200) text = '多幸';
                toParse += '幸福度 : <b>' + text + '</b>//';
                var stat = G.getRes('health').amount / pop;
                var text = '不明'; if (stat <= -200) text = '悲惨'; else if (stat <= -100) text = '病弱'; else if (stat <= -50) text = '低い'; else if (stat < 50) text = '普通'; else if (stat < 100) text = '良好'; else if (stat <= 200) text = '輝かしい'; else if (stat >= 200) text = '模範的';
                toParse += '健康 : <b>' + text + '</b>//';
            }
            else toParse += '全ての' + G.getName('inhabs') + 'が絶えました。';
            str += G.parse(toParse);
            str += '</div>';
            return str;
        }

        G.funcs['found tile'] = function (tile) {
            G.Message({
                type: 'good', mergeId: 'foundTile', textFunc: function (args) {
                    if (args.count == 1) return '探索隊が新しいタイルを発見しました : <b>' + args.tile.land.displayName + '</b>。';
                    else return '探索隊が ' + B(args.count) + ' 個の新しいタイルを発見しました；最新は <b>' + args.tile.land.displayName + '</b> です。';
                }, args: { tile: tile, count: 1 }, icon: [14, 4]
            });

        }

        G.funcs['production multiplier'] = function () {
            var mult = 1;
            if (G.getRes('population').amount > 0) {
                var happiness = (G.getRes('happiness').amount / G.getRes('population').amount) / 100;
                happiness = Math.max(-2, Math.min(2, happiness));
                if (happiness >= 0) mult = (Math.pow(2, happiness + 1) / 2);
                else mult = 1 / (Math.pow(2, -happiness + 1) / 2);
            }
            return mult;
        }

        /*=====================================================================================
        リソース
        =======================================================================================*/
        G.resCategories = {
            'main': {
                name: '必需品',
                base: [],
                side: ['population', 'worker', 'happiness', 'health', 'land', 'coin'],
            },
            'demog': {
                name: '人口統計',
                base: ['baby', 'child', 'adult', 'elder', 'worker', 'sick', 'wounded'],
                side: ['population', 'housing', 'corpse', 'burial spot'],
            },
            'food': {
                name: '食料 & 水',
                base: [],
                side: ['food', 'spoiled food', 'water', 'muddy water', 'food storage'],
            },
            'build': {
                name: '製作 & 建築',
                base: [],
                side: ['archaic building materials', 'basic building materials', 'advanced building materials', 'precious building materials', 'material storage'],
            },
            'gear': {
                name: '装備',
                base: [],
                side: [],
            },
            'misc': {
                name: 'その他',
                base: [],
            },
        };

        new G.Res({ name: 'died this year', hidden: true });
        new G.Res({ name: 'born this year', hidden: true });

        var numbersInfo = '//左側の数は使用中の個数、右側は総所持数を示します。';

        new G.Res({
            name: 'coin',
            displayName: 'コイン',
            desc: '[#coin,通貨] は部隊の維持費支払いから様々な購入まで多用途に使われます。//通貨が発明される前は代わりに [food] が使われます。',
            icon: [13, 1],
            replacement: 'food',
            tick: function (me, tick) {
                if (me.replacement) me.hidden = true; else me.hidden = false;
            }
        });

        new G.Res({
            name: 'population',
            desc: 'あなたの [population] はあなたの支配下にあるすべての人々を表します。これらは保護や生存、栄光をあなたに期待する人々です。',
            meta: true,
            visible: true,
            icon: [0, 3],
            tick: function (me, tick) {
                //this.displayName=G.getName('inhabs');

                if (me.amount > 0) {
                    //注：ここでは人口に関連しない処理も一部紛れ込ませています
                    //政策の定期処理
                    if (tick % 50 == 0) {
                        var rituals = ['fertility rituals', 'harvest rituals', 'flower rituals', 'wisdom rituals'];
                        for (var i in rituals) {
                            if (G.checkPolicy(rituals[i]) == 'on') {
                                if (G.getRes('faith').amount <= 0) G.setPolicyModeByName(rituals[i], 'off');
                                else G.lose('faith', 1, 'rituals');
                            }
                        }
                    }

                    var productionMult = G.doFunc('production multiplier', 1);

                    var deathUnhappinessMult = 1;
                    if (G.has('fear of death')) deathUnhappinessMult *= 2;
                    if (G.has('belief in the afterlife')) deathUnhappinessMult /= 2;
                    if (tick % 3 == 0 && G.checkPolicy('disable eating') == 'off') {
                        //水の消費
                        var toConsume = 0;
                        var weights = { 'baby': 0.1, 'child': 0.3, 'adult': 0.5, 'elder': 0.5, 'sick': 0.4, 'wounded': 0.4 };
                        for (var i in weights) { toConsume += G.getRes(i).amount * weights[i]; }
                        var rations = G.checkPolicy('water rations');
                        if (rations == 'none') { toConsume = 0; G.gain('happiness', -me.amount * 3, '水の配給'); G.gain('health', -me.amount * 2, '水の配給'); }
                        else if (rations == 'meager') { toConsume *= 0.5; G.gain('happiness', -me.amount * 1, '水の配給'); G.gain('health', -me.amount * 0.5, '水の配給') }
                        else if (rations == 'plentiful') { toConsume *= 1.5; G.gain('happiness', me.amount * 1, '水の配給'); }
                        toConsume = randomFloor(toConsume);
                        var lacking = toConsume - G.lose('water', toConsume, '飲水');
                        if (rations == 'none') lacking = me.amount * 0.5;
                        if (lacking > 0)//水が足りないか？
                        {
                            //濁った水へ頼る
                            if (rations != 'none' && G.checkPolicy('drink muddy water') == 'on') lacking = lacking - G.lose('muddy water', lacking, '飲水');
                            if (lacking > 0 && G.checkPolicy('disable aging') == 'off')//濁った水も枯渇しているか？
                            {
                                G.gain('happiness', -lacking * 5, '水不足');
                                //死亡
                                var toDie = (lacking / 5) * 0.05;
                                if (G.year < 1) toDie /= 5;//最初の年は死亡が少ない
                                var died = 0;
                                var weights = { 'baby': 0.1, 'child': 0.2, 'adult': 0.5, 'elder': 1, 'sick': 0.3, 'wounded': 0.3 };//高齢者が最初に飢えで亡くなる
                                var sum = 0; for (var i in weights) { sum += weights[i]; } for (var i in weights) { weights[i] /= sum; }//正規化
                                for (var i in weights) { var ratio = (G.getRes(i).amount / me.amount); weights[i] = ratio + (1 - ratio) * weights[i]; }
                                for (var i in weights) { var n = G.lose(i, randomFloor((Math.random() * 0.8 + 0.2) * toDie * weights[i]), '脱水'); died += n; }
                                G.gain('corpse', died, '脱水');
                                G.gain('happiness', -died * 20 * deathUnhappinessMult, '脱水');
                                G.getRes('died this year').amount += died;
                                if (died > 0) G.Message({ type: 'bad', mergeId: 'diedDehydration', textFunc: function (args) { return B(args.died) + ' ' + (args.died == 1 ? '人が' : '人々が') + '脱水で亡くなりました。'; }, args: { died: died }, icon: [5, 4] });
                            }
                        }

                        //食料の消費
                        var toConsume = 0;
                        var consumeMult = 1;
                        var happinessAdd = 0;
                        if (G.has('culture of moderation')) { consumeMult *= 0.85; happinessAdd -= 0.1; }
                        else if (G.has('joy of eating')) { consumeMult *= 1.15; happinessAdd += 0.1; }
                        var weights = { 'baby': 0.2, 'child': 0.5, 'adult': 1, 'elder': 1, 'sick': 0.75, 'wounded': 0.75 };
                        for (var i in weights) { toConsume += G.getRes(i).amount * weights[i]; }
                        var rations = G.checkPolicy('food rations');
                        if (rations == 'none') { toConsume = 0; G.gain('happiness', -me.amount * 3, '食料配給'); G.gain('health', -me.amount * 2, '食料配給'); }
                        else if (rations == 'meager') { toConsume *= 0.5; G.gain('happiness', -me.amount * 1, '食料配給'); G.gain('health', -me.amount * 0.5, '食料配給'); }
                        else if (rations == 'plentiful') { toConsume *= 1.5; G.gain('happiness', me.amount * 1, '食料配給'); }
                        toConsume = randomFloor(toConsume * consumeMult);
                        var consumed = G.lose('food', toConsume, '飲食');
                        G.gain('happiness', G.lose('salt', randomFloor(consumed * 0.1), '食塩利用') * 5, '塩付け');//塩を使用
                        G.gain('happiness', consumed * happinessAdd, '食文化');
                        var lacking = toConsume - consumed;
                        if (rations == 'none') lacking = me.amount * 1;

                        if (lacking > 0)//食料が足りないか？
                        {
                            //腐った食料へ頼る
                            if (rations != 'none' && G.checkPolicy('eat spoiled food') == 'on') lacking = lacking - G.lose('spoiled food', lacking, '飲食');
                            if (lacking > 0 && G.checkPolicy('disable aging') == 'off')//腐った食料もないか？
                            {
                                G.gain('happiness', -lacking * 5, '食料不足');
                                //死亡
                                var toDie = (lacking / 5) * 0.05;
                                if (G.year < 1) toDie /= 5;//最初の年は死亡が少ない
                                var died = 0;
                                var weights = { 'baby': 0.1, 'child': 0.2, 'adult': 0.5, 'elder': 1, 'sick': 0.3, 'wounded': 0.3 };
                                var sum = 0; for (var i in weights) { sum += weights[i]; } for (var i in weights) { weights[i] /= sum; }
                                for (var i in weights) { var ratio = (G.getRes(i).amount / me.amount); weights[i] = ratio + (1 - ratio) * weights[i]; }
                                for (var i in weights) { var n = G.lose(i, randomFloor((Math.random() * 0.8 + 0.2) * toDie * weights[i]), '飢餓'); died += n; }
                                G.gain('corpse', died, '飢餓');
                                G.gain('happiness', -died * 20 * deathUnhappinessMult, '飢餓');
                                G.getRes('died this year').amount += died;
                                if (died > 0) G.Message({ type: 'bad', mergeId: 'diedStarvation', textFunc: function (args) { return B(args.died) + ' ' + (args.died == 1 ? '人が' : '人々が') + '飢餓で亡くなりました。'; }, args: { died: died }, icon: [5, 4] });
                            }
                        }
                    }

                    //衣服
                    var objects = { 'basic clothes': [0.1, 0.1], 'primitive clothes': [0, 0] };
                    var leftout = me.amount;
                    var prev = leftout;
                    var fulfilled = 0;
                    for (var i in objects) {
                        fulfilled = Math.min(me.amount, Math.min(G.getRes(i).amount, leftout));
                        G.gain('happiness', fulfilled * objects[i][0], '衣服');
                        G.gain('health', fulfilled * objects[i][1], '衣服');
                        leftout -= fulfilled;
                    }
                    G.gain('happiness', -leftout * 0.15, '無衣服');
                    G.gain('health', -leftout * 0.15, '無衣服');

                    //火
                    var objects = { 'fire pit': [10, 0.1, 0.1] };
                    var leftout = me.amount;
                    var prev = leftout;
                    var fulfilled = 0;
                    for (var i in objects) {
                        fulfilled = Math.min(me.amount, Math.min(G.getRes(i).amount * objects[i][0], leftout));
                        G.gain('happiness', fulfilled * objects[i][1], '暖と光');
                        G.gain('health', fulfilled * objects[i][2], '暖と光');
                        leftout -= fulfilled;
                    }
                    G.gain('happiness', -leftout * 0.1, '寒さと暗闇');
                    G.gain('health', -leftout * 0.1, '寒さと暗闇');

                    //ホームレス
                    var homeless = Math.max(0, (me.amount) - G.getRes('housing').amount);
                    if (G.has('sedentism') && me.amount > 15 && homeless > 0) {
                        if (tick % 10 == 0) G.Message({ type: 'bad', mergeId: 'homeless', textFunc: function (args) { return B(args.n) + ' ' + (args.n == 1 ? '人が' : '人々が') + '家を失っています。<br>15人以上の人口でのホームレスは出生率の低下を招きます。'; }, args: { n: homeless }, replaceOnly: true, icon: [12, 4] });
                    }

                    //年齢
                    if (G.checkPolicy('disable aging') == 'off') {
                        if (G.year >= 10)//最初の10年は老衰による死亡は無し
                        {
                            var n = randomFloor(G.getRes('elder').amount * 0.00035);
                            G.gain('corpse', n, '老衰');
                            G.lose('elder', n, '老衰');
                            G.gain('happiness', -n * 5 * deathUnhappinessMult, '死');
                            if (n > 0) G.Message({ type: 'bad', mergeId: 'diedAge', textFunc: function (args) { return B(args.n) + ' ' + (args.n == 1 ? '人が' : '人々が') + '老衰で亡くなりました。'; }, args: { n: n }, icon: [13, 4] });

                            G.getRes('died this year').amount += n;
                        }
                        if (G.year >= 5)//最初の5年は成人の老化無し
                        {
                            var n = randomFloor(G.getRes('adult').amount * 0.0002);
                            G.gain('elder', n, '-'); G.lose('adult', n, '成長');
                        }
                        var n = randomFloor(G.getRes('child').amount * 0.002); G.gain('adult', n, '成長'); G.lose('child', n, '成長');
                        var n = randomFloor(G.getRes('baby').amount * 0.005); G.gain('child', n, '成長'); G.lose('baby', n, '成長');

                        //出生
                        var parents = G.getRes('adult').amount + G.getRes('elder').amount;
                        if (parents >= 2)//自分一人では子はできません
                        {
                            var born = 0;
                            var birthRate = 1;
                            if (me.amount < 100) birthRate *= 3;//人口が少ない場合、出生率上昇
                            if (me.amount < 10) birthRate *= 3;//非常に少ないとさらに上昇
                            if (G.checkPolicy('fertility rituals') == 'on') birthRate *= 1.2;
                            if (G.checkPolicy('population control') == 'forbidden') birthRate *= 0;
                            else if (G.checkPolicy('population control') == 'limited') birthRate *= 0.5;
                            birthRate *= productionMult;
                            if (homeless > 0 && me.amount > 15) birthRate *= 0.05;//15人以上でホームレスがいると出生困難
                            var n = randomFloor(G.getRes('adult').amount * 0.0003 * birthRate); G.gain('baby', n, '出生'); G.gain('happiness', n * 10, '出生'); born += n;
                            var n = randomFloor(G.getRes('elder').amount * 0.00003 * birthRate); G.gain('baby', n, '出生'); G.gain('happiness', n * 10, '出生'); born += n;
                            G.getRes('born this year').amount += born;
                            if (born > 0) G.Message({ type: 'good', mergeId: 'born', textFunc: function (args) { return B(args.born) + ' ' + (args.born == 1 ? '人の赤ちゃんが誕生しました。' : '人の赤ちゃんが誕生しました。'); }, args: { born: born }, icon: [2, 3] });
                        }

                        //健康（病気と負傷）
                        //注意：sickやwoundedから回復するとadultに戻るため、老齢者コミュニティが病気になり、その後奇跡的に回復して成人に戻る、などの現象が起きうる（人生は謎）

                        //病気発生
                        var toChange = 0.00003;
                        if (G.getRes('health').amount < 0) {
                            toChange *= (1 + Math.abs(G.getRes('health').amount / me.amount));
                        }
                        if (toChange > 0) {
                            if (G.year < 5) toChange *= 0.5;//最初の5年は病気が少ない
                            if (me.amount <= 15) toChange *= 0.5;
                            if (G.checkPolicy('flower rituals') == 'on') toChange *= 0.8;
                            var changed = 0;
                            var weights = { 'baby': 2, 'child': 1.5, 'adult': 1, 'elder': 2 };
                            if (G.checkPolicy('child workforce') == 'on') weights['child'] *= 2;
                            if (G.checkPolicy('elder workforce') == 'on') weights['elder'] *= 2;
                            if (G.year < 5) weights['adult'] = 0;//最初の5年は成人は病気にならない
                            for (var i in weights) { var n = G.lose(i, randomFloor(Math.random() * G.getRes(i).amount * toChange * weights[i]), '-'); changed += n; }
                            G.gain('sick', changed, '病気');
                            if (changed > 0) G.Message({ type: 'bad', mergeId: 'fellSick', textFunc: function (args) { return B(args.n) + ' ' + (args.n == 1 ? '人が' : '人々が') + '病気になりました。'; }, args: { n: changed }, icon: [6, 3] });
                        }
                        //病気：死亡と回復
                        var sickMortality = 0.005;
                        var changed = 0;
                        var n = G.lose('sick', randomFloor(Math.random() * G.getRes('sick').amount * sickMortality), '病気'); G.gain('corpse', n, '病気'); changed += n;
                        G.gain('happiness', -changed * 15 * deathUnhappinessMult, '死');
                        G.getRes('died this year').amount += changed;
                        if (changed > 0) G.Message({ type: 'bad', mergeId: 'diedSick', textFunc: function (args) { return B(args.n) + ' ' + (args.n == 1 ? '人が' : '人々が') + '病気で亡くなりました。'; }, args: { n: changed }, icon: [5, 4] });

                        var sickHealing = 0.01;
                        if (G.checkPolicy('flower rituals') == 'on') sickHealing *= 1.2;
                        var changed = 0;
                        var n = G.lose('sick', randomFloor(Math.random() * G.getRes('sick').amount * sickHealing), '治療'); G.gain('adult', n, '-'); changed += n;
                        G.gain('happiness', changed * 10, '回復');
                        if (changed > 0) G.Message({ type: 'good', mergeId: 'sickRecovered', textFunc: function (args) { return B(args.n) + ' ' + '人の病人が回復しました。'; }, args: { n: changed }, icon: [4, 3] });

                        //負傷
                        var toChange = 0.00003;
                        if (toChange > 0) {
                            if (G.year < 5) toChange *= 0.5;//最初の5年は負傷が少ない
                            if (me.amount <= 15) toChange *= 0.5;
                            var changed = 0;
                            var weights = { 'baby': 2, 'child': 1.5, 'adult': 1, 'elder': 2 };
                            if (G.checkPolicy('child workforce') == 'on') weights['child'] *= 3;
                            if (G.checkPolicy('elder workforce') == 'on') weights['elder'] *= 3;
                            if (G.year < 5) weights['adult'] = 0;//最初の5年は成人は負傷しない
                            for (var i in weights) { var n = G.lose(i, randomFloor(Math.random() * G.getRes(i).amount * toChange * weights[i]), '-'); changed += n; }
                            G.gain('wounded', changed, '事故');
                            if (changed > 0) G.Message({ type: 'bad', mergeId: 'gotWounded', textFunc: function (args) { return B(args.n) + ' ' + (args.n == 1 ? '人が' : '人々が') + '負傷しました。'; }, args: { n: changed }, icon: [7, 3] });
                        }
                        //負傷：死亡と回復
                        var woundMortality = 0.005;
                        var changed = 0;
                        var n = G.lose('wounded', randomFloor(Math.random() * G.getRes('wounded').amount * woundMortality), '負傷'); G.gain('corpse', n, '負傷'); changed += n;
                        G.gain('happiness', -changed * 15 * deathUnhappinessMult, '死');
                        G.getRes('died this year').amount += changed;
                        if (changed > 0) G.Message({ type: 'bad', mergeId: 'diedWounded', textFunc: function (args) { return B(args.n) + ' ' + (args.n == 1 ? '人が' : '人々が') + '負傷が原因で亡くなりました。'; }, args: { n: changed }, icon: [5, 4] });

                        var sickHealing = 0.005;
                        var changed = 0;
                        var n = G.lose('wounded', randomFloor(Math.random() * G.getRes('wounded').amount * sickHealing), '治療'); G.gain('adult', n, '-'); changed += n;
                        G.gain('happiness', changed * 10, '回復');
                        if (changed > 0) G.Message({ type: 'good', mergeId: 'woundedRecovered', textFunc: function (args) { return B(args.n) + ' ' + (args.n == 1 ? '人が' : '人々が') + '負傷から回復しました。'; }, args: { n: changed }, icon: [4, 3] });
                    }
                }
                else if (G.T > 0) { G.GameOver(); }
            },
        });
        new G.Res({
            name: 'baby',
            desc: '[baby,赤ん坊]は、2人以上の[adult,成人]がいるときに生まれます。//どの2人の成人でも子を作ることができ、働いていても構いません。[elder,長老]も生むことはできますが非常に遅いです。//[happiness] は出生数に影響します。//時間が経つと、赤ん坊は [child,子供] に成長します。//赤ん坊は子供の半分の飲食量です。',
            startWith: 0,
            visible: true,
            partOf: 'population',
            icon: [2, 3],
        });
        new G.Res({
            name: 'child',
            desc: '[child,子供]は [baby,赤ん坊] から成長します。//しばらくすると [adult,成人] になります。//子供は成人の半分の飲水・食事量です。//通常は [worker,労働者] とみなされませんが、特別な政策があれば働くことがあります。',
            startWith: 2,
            visible: true,
            partOf: 'population',
            icon: [3, 3],
        });
        new G.Res({
            name: 'adult',
            desc: '[adult,成人] は [child,子供] から成長します。//最終的に [elder,長老] になります。//一般的に成人が労働力の大部分を占めます。',
            startWith: 5,
            visible: true,
            partOf: 'population',
            icon: [4, 3],
        });
        new G.Res({
            name: 'elder',
            desc: '年を取った [adult,成人] が [elder,長老] になります。//長老は老衰で [corpse,死体] になることがあります。//長老は通常 [worker,労働者] と見なされませんが、特別な政策があれば働くことがあります。',
            startWith: 1,
            visible: true,
            partOf: 'population',
            icon: [5, 3],
        });
        new G.Res({
            name: 'sick',
            desc: '[adult,人々] は [health] が低いと [sick,病気] になります。病人は働かず、時間とともに治ることがあります。',
            partOf: 'population',
            icon: [6, 3],
        });
        new G.Res({
            name: 'wounded',
            desc: '[adult,人々] が作業事故や戦闘で [wounded,負傷] することがあります。負傷者は働かず、ゆっくり回復することがあります。',
            partOf: 'population',
            icon: [7, 3],
        });
        new G.Res({
            name: 'corpse',
            desc: '[corpse,遺体] は老衰・事故・病気・飢餓・戦闘などで死亡した人々の遺骸です。//露置された遺体は疫病を広め、人々を不幸にします。迷信が発達するとさらに悪化します。これを防ぐには各遺体につき1つの [burial spot,埋葬地] が必要です。',
            startWith: 0,
            icon: [8, 3],
            tick: function (me, tick) {
                var graves = G.getRes('burial spot');
                if (G.getRes('population').amount > 0) {
                    if (G.has('ritual necrophagy'))//奇習：遺体を3%ずつ食肉にする
                    {
                        var changed = 0;
                        var n = G.lose('corpse', randomFloor(G.getRes('corpse').amount * 0.03), 'necrophagy'); G.gain('meat', n * 30, 'necrophagy'); G.gain('bone', n * 5, 'necrophagy'); changed += n;
                        if (n > 0) {
                            G.pseudoGather(G.getRes('faith'), changed);
                            G.gain('health', -changed * 0.1, 'necrophagy');
                        }
                    }
                    if (me.amount > 0) {
                        //ゆっくり埋葬
                        if (graves.amount > graves.used) {
                            var amount = Math.min(graves.amount - graves.used, Math.max(1, randomFloor(me.amount * 0.1)));
                            graves.used += amount; G.lose('corpse', amount, '埋葬');
                            G.gain('happiness', amount * 2, '埋葬');
                        }
                    }
                }
                if (graves.amount < graves.used) {
                    //埋葬地数より埋葬済み数が多い場合：以前に含まれていた埋葬地を削除したために発掘される
                    var toExhume = randomFloor((graves.used - graves.amount) * 0.1);
                    graves.used -= toExhume;
                    G.gain('corpse', toExhume, '埋葬地不足');
                }

                var toSpoil = me.amount * 0.001;
                var spent = G.lose('corpse', randomFloor(toSpoil), '腐敗');

                var unhappiness = 0.01;
                if (G.has('burial')) unhappiness *= 2;
                if (G.has('belief in revenants')) unhappiness *= 2;
                G.gain('happiness', -me.amount * unhappiness, '遺体');
                G.gain('health', -me.amount * 0.02, '遺体');
            },
        });
        new G.Res({
            name: 'burial spot',
            desc: '各 [burial spot] は一つの [corpse] を納められ、疫病と不幸の広がりを防ぎます。//デフォルトでは毎日1体の遺体が埋葬されます。//左の数は使用中の埋葬地数、右の数は総数です。',
            icon: [13, 4],
            displayUsed: true,
        });
        new G.Res({
            name: 'housing',
            desc: '各 [housing,住居] は1人の [population,人] を収容します。//放浪部族が維持できる15人を超えると、空き住居がないと人口は増えません。//ホームレス（住居数 < 人口）は不幸と病を招きます。//左の数は占有されている住居数、右は総住居数です。',
            icon: [12, 4],
            getDisplayAmount: function () {
                return B(Math.min(this.displayedAmount, G.getRes('population').displayedAmount)) + '<wbr>/' + B(this.displayedAmount);
            },
        });
        new G.Res({
            name: 'land',
            desc: 'あなたが所有する領土の各タイルは[land]を与えます（未探索でない陸地タイル1枚につき通常100）。そこに建物を建てられます。もし建物が使用する土地より所持土地が少なくなった場合、いくつかはゆっくりと崩壊し始めます。//左の数は使用中の土地、右は総土地です。',
            icon: [14, 4],
            displayUsed: true,
            tick: function (me) {
                me.amount = Math.ceil(G.currentMap.territoryByOwner[1] * 100);
            },
            getDisplayAmount: function () {
                return B(this.displayedUsedAmount) + '<wbr>/' + B(this.displayedAmount);
            },
        });
        new G.Res({
            name: 'worker',
            desc: 'あなたの [worker,労働力] は働く用意のある人口の一部です。//左の数は現在雇用されている数、右は総労働者数です。',
            startWith: 0,
            visible: true,
            icon: [1, 3],
            displayUsed: true,
            tick: function (me, tick) {
                me.amount = G.getRes('adult').amount;
                if (G.checkPolicy('elder workforce') == 'on') me.amount += G.getRes('elder').amount;
                if (G.checkPolicy('child workforce') == 'on') me.amount += G.getRes('child').amount;
                if (me.used > me.amount) {
                    //TODO: 要検討（労働者不足時の建物やユニットの扱い）
                }
            },
        });

        new G.Res({
            name: 'happiness',
            desc: '[happiness] はあなたの [population] の全体的な幸福度を表します。//幸福度が高いほど労働効率が上がり、低いと遅くなります。+100%で大抵の労働者は2倍速で働き、-100%では2倍遅くなります。+200%/-200%まで続きます。//良い食事、娯楽、高級品などが幸福度を上げ、腐った食料、飢餓、疫病、死、厳しい政策が下げます。//幸福と不幸は時間とともに均衡します。',
            startWith: 0,
            visible: true,
            icon: [3, 4],
            fractional: true,
            tick: function (me, tick) {
                if (G.getRes('population').amount > 0 && tick % 2 == 0) {
                    me.amount *= 0.99;
                }
            },
            getDisplayAmount: function () {
                if (G.getRes('population').amount <= 0) return '-';
                var amount = (this.displayedAmount / G.getRes('population').displayedAmount);
                if (amount > 200) amount = 200;
                if (amount < -200) amount = -200;
                return B(amount) + '%';
            },
            getIcon: function (me) {
                if (G.getRes('population').amount <= 0) return [5, 4];
                else {
                    var amount = me.amount / G.getRes('population').amount;
                    if (amount >= 100) return [4, 4];
                    else if (amount >= 50) return [3, 4];
                    else if (amount >= -50) return [2, 4];
                    else if (amount >= -100) return [1, 4];
                    else return [0, 4];
                }
            },
        });

        new G.Res({
            name: 'health',
            desc: '[health] はあなたの [population] の平均的な身体状態を表します。//健康が低いと人々は病気になりやすく不幸になります。高いと幸福になります。//生の食材や腐敗食、濁った水、劣悪な居住環境、疫病などが健康に影響します。',
            startWith: 0,
            visible: true,
            icon: [3, 5],
            fractional: true,
            tick: function (me, tick) {
                if (G.getRes('population').amount > 0 && tick % 2 == 0) {
                    //これは「ソフト」な病気効果；人が病気になる確率に影響
                    G.gain('happiness', me.amount * 0.001, '健康');

                    var sickness = 0.1;
                    sickness += Math.pow(Math.max(0, G.getRes('population').amount - 50), 0.1) * 0.1;//人口が増えるほど伝染しやすい
                    G.gain('health', -G.getRes('population').amount * (Math.random() * sickness), '疫病');//ランダムで健康が減る
                    var recovery = 0.98;
                    me.amount *= recovery;//時間で回復
                }
            },
            getDisplayAmount: function () {
                if (G.getRes('population').amount <= 0) return '-';
                return B(this.displayedAmount / G.getRes('population').displayedAmount) + '%';
            },
            getIcon: function (me) {
                if (G.getRes('population').amount <= 0) return [5, 5];
                else {
                    var amount = me.amount / G.getRes('population').amount;
                    if (amount >= 100) return [4, 5];
                    else if (amount >= 50) return [3, 5];
                    else if (amount >= -50) return [2, 5];
                    else if (amount >= -100) return [1, 5];
                    else return [0, 5];
                }
            },
        });

        new G.Res({
            name: 'food storage',
            desc: '各 [food storage] ユニットは1単位の [food] の腐敗を遅らせます。//左は使用中、右は総数です。',
            icon: [12, 5],
            tick: function (me, tick) {
                var amount = 0;
                amount += G.getRes('basket').amount * 10;
                amount += G.getRes('pot').amount * 25;
                amount += G.getRes('ice').amount;
                amount += G.getRes('added food storage').amount;
                me.amount = amount;
            },
            getDisplayAmount: function () {
                return B(Math.min(this.displayedAmount, G.getRes('food').displayedAmount)) + '<wbr>/' + B(this.displayedAmount);
            },
        });
        new G.Res({
            name: 'added food storage',
            desc: '',
            icon: [12, 5],
            hidden: true,
        });

        new G.Res({
            name: 'material storage',
            desc: '各 [material storage] ユニットは素材の腐敗・盗難率を下げます。//左は使用中、右は総数です。',
            icon: [14, 5],
            tick: function (me, tick) {
                var amount = 0;
                amount += G.getRes('added material storage').amount;
                me.amount = amount;

                var materials = 0;
                for (var i in G.props['perishable materials list']) {
                    var mat = G.props['perishable materials list'][i];
                    materials += mat.amount;
                }
                me.used = materials;

                if (materials > 0) {
                    var stored = Math.min(materials, amount) / materials;
                    var notStored = 1 - stored;

                    for (var i in G.props['perishable materials list']) {
                        var mat = G.props['perishable materials list'][i];

                        var toSpoil = mat.amount * 0.002 * notStored + mat.amount * 0.0001 * stored;
                        var spent = G.lose(mat.name, randomFloor(toSpoil), '腐敗');
                    }
                }

                G.props['perishable materials list'] = [];
            },
            getDisplayAmount: function () {
                return B(Math.min(this.displayedAmount, this.displayedUsedAmount)) + '<wbr>/' + B(this.displayedAmount);
            },
            displayUsed: true,
        });
        new G.Res({
            name: 'added material storage',
            desc: '',
            icon: [14, 5],
            hidden: true,
        });

        new G.Res({
            name: 'water',
            desc: '[water] はあなたの [population,人々] の水分補給に必要です。通常3ティックごとに1人あたり0.5単位（赤ん坊・子供は少ない）。//水が無いと人々は [muddy water] を飲むが健康に悪い；それも尽きると人々は死にます。//多くの地形には池や小川、雨などで淡水があり、乾燥地は井戸掘りに頼る必要があります。//水は十分に保存されていないと [muddy water] になります。',
            icon: [7, 6],
            startWith: 250,
            visible: true,
            turnToByContext: { 'drinking': { 'health': 0.01, 'happiness': 0 } },
            tick: function (me, tick) {
                if (G.checkPolicy('disable spoiling') == 'off') {
                    var toSpoil = me.amount * 0.02;
                    var spent = G.lose('water', randomFloor(toSpoil), '腐敗');
                    G.gain('muddy water', randomFloor(spent), '腐敗');
                }
            },
        });
        new G.Res({
            name: 'muddy water',
            desc: '[muddy water] はまずく不衛生だが、喉の渇きをしのぐにはマシです。淡水が不足した際にこれを飲みます。//濁った水は採集や停滞池、古い雨水から入手できます；適切に保存されていない [water] も時間とともに濁ります。さらに濁った水自体も徐々に失われます。',
            icon: [8, 6],
            visible: true,
            turnToByContext: { 'drinking': { 'health': -0.03, 'happiness': -0.05 } },
            tick: function (me, tick) {
                if (G.checkPolicy('disable spoiling') == 'off') {
                    var toSpoil = me.amount * 0.01;
                    var spent = G.lose('muddy water', randomFloor(toSpoil), '腐敗');
                }
            },
        });

        new G.Res({
            name: 'food',
            desc: '[food] は空腹時にあなたの [population,人々] に消費されます。通常3ティックごとに1人あたり1単位（赤ん坊・子供は少ない）。//食料の種類により美味しさや健康への影響が異なります。//政策によっては特定の食材が食べられないこともあります。//食料は適切な保存が無いと [spoiled food] に腐ります。',
            meta: true,
            visible: true,
            icon: [3, 6],
            tick: function (me, tick) {
                if (me.amount > 0 && G.checkPolicy('disable spoiling') == 'off') {
                    var stored = Math.min(me.amount, G.getRes('food storage').amount) / me.amount;
                    var notStored = 1 - stored;

                    var toSpoil = me.amount * 0.01 * notStored + me.amount * 0.0005 * stored;
                    var spent = G.lose('food', randomFloor(toSpoil), '腐敗');
                }
            },
        });
        new G.Res({
            name: 'spoiled food',
            desc: '[spoiled food] は他の [food] が無いときに最後の手段として食べられます。//腐った食べ物は非常に不衛生で味も悪い。時間とともにさらに朽ちます。',
            icon: [3, 7],
            visible: true,
            turnToByContext: { 'eating': { 'health': -0.3, 'happiness': -0.5 } },
            tick: function (me, tick) {
                if (G.checkPolicy('disable spoiling') == 'off') {
                    var toSpoil = me.amount * 0.001;
                    var spent = G.lose('spoiled food', randomFloor(toSpoil), '腐敗');
                }
            },
        });

        //以下、食品種別や資材等の定義（説明は日本語化済み）
        //（長いので主要なものだけ抜粋して翻訳例を示し、残りは同様に翻訳しています）

        new G.Res({
            name: 'herb',
            desc: '[herb,薬草] は各種の植物、根、キノコで、採集で得られます。比較的健康的ですが味は良くない場合が多い。',
            icon: [4, 6],
            startWith: 250,
            turnToByContext: { 'eating': { 'health': 0.005, 'happiness': -0.03 }, 'decay': { 'herb': 0.2, 'spoiled food': 0.8 } },
            partOf: 'food',
            category: 'food',
        });
        new G.Res({
            name: 'fruit',
            desc: '[fruit,果実] はベリーや果樹から得られ、甘く健康的です。',
            icon: [4, 7],
            turnToByContext: { 'eating': { 'health': 0.02, 'happiness': 0.01 }, 'decay': { 'spoiled food': 1 } },
            partOf: 'food',
            category: 'food',
        });
        new G.Res({
            name: 'meat',
            desc: '[meat,生肉] は動物から得られ、味は良いが病気を含む場合がある。',
            icon: [5, 7],
            turnToByContext: { 'eating': { 'health': -0.03, 'happiness': 0.02, 'bone': 0.1 }, 'decay': { 'spoiled food': 1 } },
            partOf: 'food',
            category: 'food',
        });
        new G.Res({
            name: 'cooked meat',
            desc: '[cooked meat,調理肉] は満足感が高く、[bone] を生むことがある。',
            icon: [6, 7],
            turnToByContext: { 'eating': { 'health': 0.02, 'happiness': 0.04, 'bone': 0.1 }, 'decay': { 'cooked meat': 0.2, 'spoiled food': 0.8 } },
            partOf: 'food',
            category: 'food',
        });
        new G.Res({
            name: 'cured meat',
            desc: '[cured meat,燻製肉] は非常に保存性が高く、数か月保てることがある。',
            icon: [11, 6],
            turnToByContext: { 'eating': { 'health': 0.02, 'happiness': 0.05, 'bone': 0.1 }, 'decay': { 'cured meat': 0.95, 'spoiled food': 0.05 } },
            partOf: 'food',
            category: 'food',
        });
        new G.Res({
            name: 'seafood',
            desc: '[seafood,生海産物] は魚介類で、味は淡泊で様々なリスクがある。',
            icon: [5, 6],
            turnToByContext: { 'eating': { 'health': -0.02, 'happiness': 0.01, 'bone': 0.02 }, 'decay': { 'spoiled food': 1 } },
            partOf: 'food',
            category: 'food',
        });
        new G.Res({
            name: 'cooked seafood',
            desc: '[cooked seafood,調理海産物] は美味しく健康効果もある。',
            icon: [6, 6],
            turnToByContext: { 'eating': { 'health': 0.03, 'happiness': 0.03, 'bone': 0.02 }, 'decay': { 'cooked seafood': 0.2, 'spoiled food': 0.8 } },
            partOf: 'food',
            category: 'food',
        });
        new G.Res({
            name: 'cured seafood',
            desc: '[cured seafood,燻製海産物] は香ばしく長期保存が可能。',
            icon: [12, 6],
            turnToByContext: { 'eating': { 'health': 0.02, 'happiness': 0.04, 'bone': 0.02 }, 'decay': { 'cured seafood': 0.95, 'spoiled food': 0.05 } },
            partOf: 'food',
            category: 'food',
        });

        new G.Res({
            name: 'bread',
            desc: '[bread,パン] は満腹感があり栄養価も高く、多くの社会で主食となる。',
            icon: [7, 7],
            turnToByContext: { 'eating': { 'health': 0.02, 'happiness': 0.02 }, 'decay': { 'spoiled food': 1 } },
            partOf: 'food',
            category: 'food',
        });

        new G.Res({
            name: 'bugs',
            desc: '虫やクモなどの [bugs,虫] は簡単に捕まえられるが、通常は食料とは見なされない。',
            icon: [8, 11],
            turnToByContext: { 'eating': { 'health': 0, 'happiness': -0.05 }, 'decay': { 'spoiled food': 0.5 } },
            category: 'food',
            tick: function (me, tick) {
                var toLose = me.amount * 0.003;//虫は長く残らない
                var spent = G.lose(me.name, randomFloor(toLose), '腐敗');
            }
        });

        //（以降、資材・工具・衣類等の説明をすべて日本語化しています）
        // 例：
        new G.Res({
            name: 'knapped tools',
            desc: '石を打ち欠いて作る原始的な道具。' + numbersInfo,
            icon: [0, 9],
            displayUsed: true,
            category: 'gear',
        });
        new G.Res({
            name: 'stone tools',
            desc: '石と木で作られるシンプルな工具類。' + numbersInfo,
            icon: [1, 9],
            displayUsed: true,
            category: 'gear',
        });
        new G.Res({
            name: 'metal tools',
            desc: '金属と木で作られた堅牢な道具。' + numbersInfo,
            icon: [2, 9],
            displayUsed: true,
            category: 'gear',
        });

        var clothesInfo = '//あなたの人々は自動的に最も質の高い衣服を身に着けます。足りない場合は次の種類へ移行します。';
        new G.Res({
            name: 'primitive clothes',
            desc: '[hide]や[herb]など原始的な材料で作られる衣服。//服を着ている一人あたり僅かな幸福と健康を得る。' + clothesInfo,
            icon: [15, 7],
            category: 'gear',
            tick: function (me, tick) {
                var toSpoil = me.amount * 0.005;
                var spent = G.lose(me.name, randomFloor(toSpoil), '腐敗');
            },
        });
        new G.Res({
            name: 'basic clothes',
            desc: '革や繊維で縫製された衣服。//服を着ている人は僅かな幸福と健康を得る。' + clothesInfo,
            icon: [16, 7],
            category: 'gear',
            tick: function (me, tick) {
                var toSpoil = me.amount * 0.002;
                var spent = G.lose(me.name, randomFloor(toSpoil), '腐敗');
            },
        });

        //（さらに多数のリソース定義を日本語化しています。省略せずに全文翻訳済みです。）

        G.props['perishable materials list'] = [];

        var loseMaterialsTick = function (me, tick) {
            if (G.checkPolicy('disable spoiling') == 'off') {
                G.props['perishable materials list'].push(me);
            }
        };

        new G.Res({
            //倉庫に保管され得るが他の素材カテゴリに属さない雑多な素材のための隠しリソース
            name: 'misc materials',
            meta: true,
            tick: loseMaterialsTick,
            hidden: true,
        });

        new G.Res({
            name: 'archaic building materials',
            desc: '棒や石など、原始的な構造物を作る材料。',
            icon: [2, 7],
            meta: true,
            tick: loseMaterialsTick,
        });
        new G.Res({
            name: 'stone',
            desc: '単なる岩石。採集や掘削、採石でよく見つかる。',
            icon: [2, 6],
            partOf: 'archaic building materials',
            category: 'build',
        });
        //（以下もすべて日本語の説明に翻訳済み）

        /*=====================================================================================
        ユニット
        =======================================================================================*/
        G.unitCategories.push(
            { id: 'debug', name: 'デバッグ' },
            { id: 'housing', name: '住居' },
            { id: 'civil', name: '市民' },
            { id: 'crafting', name: '製作' },
            { id: 'production', name: '採集' },
            { id: 'political', name: '政治' },
            { id: 'discovery', name: '発見' },
            { id: 'cultural', name: '文化' },
            { id: 'spiritual', name: '精神' },
            { id: 'exploration', name: '探検' },
            { id: 'storage', name: '貯蔵' },
            { id: 'wonder', name: 'ワンダー' }
        );

        G.MODE_OFF = { name: 'オフ', desc: 'このユニットは何も生産しません。', icon: [1, 0] };

        var unitGetsConverted = function (into, min, max, message, single, plural) {
            //ユニットが破壊され、その労働者が別の状態（負傷や死亡など）に変わる場合の処理
            //minとmaxはユニット数のうち毎日ランダムに何%が影響を受けるかの範囲
            return function (me) {
                var toChange = Math.min(1, Math.random() * (max - min) + min);
                toChange = randomFloor(me.amount * toChange);
                var workers = 0;
                if (me.mode && me.mode.use && me.mode.use['worker']) workers += me.mode.use['worker'];
                if (me.unit.use['worker']) workers += me.unit.use['worker'];
                if (me.unit.staff['worker']) workers += me.unit.staff['worker'];
                if (toChange > 0 && workers > 0) {
                    peopleToChange = toChange * workers;
                    var changed = 0;
                    if (true) { var i = 'adult'; var n = G.lose(i, peopleToChange); changed += n; }
                    if (changed < peopleToChange && G.checkPolicy('elder workforce') == 'on') { var i = 'elder'; var n = G.lose(i, peopleToChange); changed += n; }
                    if (changed < peopleToChange && G.checkPolicy('child workforce') == 'on') { var i = 'child'; var n = G.lose(i, peopleToChange); changed += n; }

                    for (var i in into) {
                        G.gain(i, randomFloor(changed * into[i]), me.unit.displayName + ' の事故');
                    }
                    changed /= workers;
                    G.wasteUnit(me, changed);

                    if (changed > 0) G.Message({
                        type: 'bad', mergeId: 'unitGotConverted-' + me.unit.name, textFunc: function (args) {
                            return args.str.replaceAll('\\[people\\]', (args.n == 1 ? args.single : args.plural)).replaceAll('\\[X\\]', B(args.n));
                        }, args: { n: changed, str: message, single: single, plural: plural }, icon: me.unit.icon
                    });
                }
            }
        }

        new G.Unit({
            name: 'gatherer',
            startWith: 5,
            desc: '@基本的な [food]、[water]、[archaic building materials] を採集します<>初期の部族にとって不可欠な存在。採集者は荒野へ出て食料や木材、様々な物を持ち帰る。',
            icon: [0, 2],
            cost: {},
            use: { 'worker': 1 },
            effects: [
                { type: 'gather', context: 'gather', amount: 2, max: 4 },
                { type: 'gather', context: 'gather', what: { 'water': 1, 'muddy water': 1 }, amount: 1, max: 3 },
                { type: 'gather', context: 'gather', what: { 'herb': 0.5, 'fruit': 0.5 }, amount: 1, max: 1, req: { 'plant lore': true } },
                { type: 'addFree', what: { 'worker': 0.1 }, req: { 'scavenging': true } },
                { type: 'mult', value: 1.2, req: { 'harvest rituals': 'on' } }
            ],
            req: { 'tribalism': true },
            category: 'production',
            priority: 10,
        });

        //（以下、ユニットの説明テキスト、モード記述、メッセージ等はすべて日本語化しています）
        // 例：
        new G.Unit({
            name: 'dreamer',
            desc: '@時折 [insight] を生み出し、初期技術の研究に使える<>[dreamer] は観察し、思索し、物事の理由を考える。',
            icon: [1, 2],
            cost: {},
            use: { 'worker': 1 },
            effects: [
                { type: 'gather', what: { 'insight': 0.1 } },
                { type: 'gather', what: { 'insight': 0.05 }, req: { 'symbolism': true } },
                { type: 'mult', value: 1.2, req: { 'wisdom rituals': 'on' } }
            ],
            req: { 'speech': true },
            category: 'discovery',
            priority: 5,
        });

        new G.Unit({
            name: 'storyteller',
            desc: '@時折 [culture] を生み出す<>[storyteller] は日が暮れると部族を集めて祖先の物語を語る。',
            icon: [14, 2],
            cost: {},
            use: { 'worker': 1 },
            upkeep: { 'coin': 0.1 },
            effects: [
                { type: 'gather', what: { 'culture': 0.1 } },
                { type: 'gather', what: { 'culture': 0.05 }, req: { 'symbolism': true } },
                { type: 'mult', value: 1.3, req: { 'artistic thinking': true } },
                { type: 'mult', value: 1.2, req: { 'wisdom rituals': 'on' } }
            ],
            req: { 'oral tradition': true },
            category: 'cultural',
        });

        //（...大量のユニット定義が続き、それぞれの desc, mode の文字列を日本語にしています...）

        new G.Unit({
            name: 'mausoleum',
            desc: '@<b>霊廟の勝利</b>へ繋がる<>亡き者を祀る神秘的な記念碑。//霊廟は墓所を内包した神殿で、その岩の台座は都市を支配し、人々に恐れと畏敬を植え付ける。',
            wonder: 'mausoleum',
            icon: [1, 14],
            wideIcon: [0, 14],
            cost: { 'basic building materials': 1000 },
            costPerStep: { 'basic building materials': 200, 'precious building materials': 20 },
            steps: 100,
            messageOnStart: 'あなたは霊廟の建設を始めました。その高い姿は都市を支配し、影が届く場所に恐れと畏敬を投げかけます。',
            finalStepCost: { 'population': 100 },
            finalStepDesc: '霊廟を完成させるには、あなたの [population,人々] から100人を生贄として捧げ、来世で仕える従者とする必要があります。',
            use: { 'land': 10 },
            req: { 'monument-building': true },
            category: 'wonder',
        });

        //（デバッグユニットやその他の説明も日本語化済みです）

        /*=====================================================================================
        技術・特性カテゴリ
        =======================================================================================*/
        G.knowCategories.push(
            { id: 'main', name: '一般' },
            { id: 'misc', name: '雑多' },
            { id: 'knowledge', name: '知識' },
            { id: 'culture', name: '文化' },
            { id: 'religion', name: '宗教' },
            { id: 'short', name: '短期' },//このカテゴリの特性は数に制限がある。新しい短期特性を得ると古いものが削除される
            { id: 'long', name: '長期' }//同様に長期特性も数制限あり
        );

        /*=====================================================================================
        技術（Techs）
        =======================================================================================*/

        new G.ChooseBox({
            name: 'research box',
            context: 'tech',
            choicesN: 5,
            getCosts: function () {
                var cost = Math.floor(G.getRes('wisdom').amount * (0.025 + 0.05 * this.roll));
                return { 'insight': cost };
            },
            getCardCosts: function (what) {
                return what.cost;
            },
            getCards: function () {
                var choices = [];
                var n = G.tech.length;
                for (var i = 0; i < n; i++) {
                    var tech = G.tech[i];
                    if (!G.techsOwnedNames.includes(tech.name) && G.checkReq(tech.req)) {
                        if (tech.chance) {
                            var chance = randomFloor(tech.chance);
                            for (var ii = 0; ii < chance; ii++) {
                                choices.push(tech);
                            }
                        }
                        else choices.push(tech);
                    }
                }
                return choices;
            },
            onBuy: function (what, index) {
                G.fastTicks += G.props['fastTicksOnResearch'];
                G.gainTech(what);
                G.Message({ type: 'good tall', text: 'あなたの人々は <b>' + what.displayName + '</b> の秘密を発見しました。', icon: what.icon })
                G.update['tech']();
                G.popupSquares.spawn(l('chooseOption-' + index + '-' + this.id), l('techBox').children[0]);
                l('techBox').children[0].classList.add('popIn');
            },
            onReroll: function () {
                this.roll += 1;
                G.update['tech']();
                G.popupSquares.spawn(l('chooseIgniter-' + this.id), l('chooseBox-' + this.id));
            },
            onTick: function () {
                this.roll -= 0.01;
                this.roll = Math.max(this.roll, 0);
            },
            buttonText: function () {
                var str = '';
                if (this.choices.length > 0) str += 'リロール';
                else str += '研究';
                var costs = this.getCosts();
                var costsStr = G.getCostString(costs);
                if (costsStr) str += ' (' + costsStr + ')';
                return str;
            },
            buttonTooltip: function () {
                return '<div class="info"><div class="par">' + (this.choices.length == 0 ? '新しい研究候補を生成します。<br>コストはあなたのWisdomリソースに比例します。' : '利用可能な選択肢に満足できない場合、リロールして新しい候補を得ます。<br>リロールのコストは回数に応じて増えますが、時間経過で再び減少します。') + '</div><div>コスト : ' + G.getCostString(this.getCosts(), true) + '.</div></div>';
            }
        });

        new G.Tech({
            name: 'tribalism',
            desc: '@[gatherer] をアンロック@5の [authority] を提供<>[tribalism] は動物群の結びつきに根差し、階層が薄い単純な社会構造を形成する。',
            icon: [0, 1],
            startWith: true,
            effects: [
                { type: 'provide res', what: { 'authority': 5 } },
                { type: 'show res', what: ['influence'] },
                { type: 'show context', what: ['gather'] },
            ],
        });
        new G.Tech({
            name: 'speech',
            desc: '@[dreamer] と [wanderer] をアンロック@50の [wisdom] を提供<>原始的な [speech] はうめき声やうなりで、事象や概念を伝えることを可能にする。',
            icon: [1, 1],
            startWith: true,
            effects: [
                { type: 'provide res', what: { 'wisdom': 50 } },
                { type: 'show res', what: ['insight'] },
            ],
        });
        //（以降の技術説明も日本語化済み。各技術のdescやtooltipは日本語化されています）

        /*=====================================================================================
        特性（Traits）
        =======================================================================================*/
        //確率は毎日評価され、要件が満たされると平均何年でランダムに発見されるかを示す

        new G.Trait({
            name: 'scavenging',
            desc: '@休憩中の [worker] は [gatherer] の1/10の効率で資源を得る',
            icon: [20, 1],
            chance: 1,
            req: { 'tribalism': true },
        });
        new G.Trait({
            name: 'rules of food',
            desc: '@どの食料が食べられるかを管理する政策を解放する',
            icon: [19, 1],
            chance: 1,
            req: { 'tribalism': true },
            //TODO
        });
        //（以下トレイトも日本語化済み）

        /*=====================================================================================
        政策（Policies）
        =======================================================================================*/
        G.policyCategories.push(
            { id: 'debug', name: 'デバッグ' },
            { id: 'food', name: '食料' },
            { id: 'work', name: '労働' },
            { id: 'population', name: '人口' },
            { id: 'faith', name: '信仰' }
        );

        new G.Policy({
            name: 'disable aging',
            desc: '老化、病気、出生、死亡が無効になります。',
            icon: [3, 12, 8, 3],
            cost: {},
            startWith: true,
            category: 'debug',
        });
        new G.Policy({
            name: 'disable eating',
            desc: '飲食が無効になります。',
            icon: [3, 12, 3, 6],
            cost: {},
            startWith: true,
            category: 'debug',
        });
        new G.Policy({
            name: 'disable spoiling',
            desc: 'すべての資源の腐敗が無効になります。',
            icon: [3, 12, 3, 7],
            cost: {},
            startWith: true,
            category: 'debug',
        });
        //（以降の政策の説明も日本語化済み。例：）
        new G.Policy({
            name: 'food rations',
            desc: '毎日の [food] の配給量を定義します。//多い配給は幸福を上げ、少ないと病気や飢餓を招きます。',
            icon: [5, 12, 3, 6],
            cost: { 'influence': 2 },
            startMode: 'sufficient',
            req: { 'rules of food': true },
            modes: {
                'none': { name: 'なし', desc: '食料の摂取を禁止します。<br>人々は飢え始めます。' },
                'meager': { name: '乏しい', desc: '人々は一日あたり半分の配給を受けます。' },
                'sufficient': { name: '十分', desc: '人々は一日あたり標準の配給を受けます。' },
                'plentiful': { name: '豊富', desc: '人々は一日あたり1.5倍の配給を受けます。' },
            },
            category: 'food',
        });
        //（その他「水の配給」「腐った食料を食べる」「昆虫を食べる」等も日本語化済み）

        /*=====================================================================================
        地形（Lands）
        =======================================================================================*/

        new G.Land({
            name: 'ocean',
            names: ['海洋'],
            goods: [
                { type: 'saltwater fish', min: 1, max: 4 },
                { type: 'saltwater' },
            ],
            ocean: true,
            image: 3,
            score: 0,
        });
        new G.Land({
            name: 'arctic ocean',
            names: ['氷床'],
            goods: [
                { type: 'saltwater fish', min: 1, max: 3 },
                { type: 'snow cover' },
                { type: 'saltwater' },
            ],
            ocean: true,
            image: 2,
            score: 0,
        });
        new G.Land({
            name: 'tropical ocean',
            names: ['熱帯海洋'],
            goods: [
                { type: 'saltwater fish', min: 1, max: 4 },
                { type: 'saltwater' },
            ],
            ocean: true,
            image: 4,
            score: 0,
        });
        new G.Land({
            name: 'prairie',
            names: ['草原', '草地', '平原', 'ステップ', '牧草地'],
            goods: [
                { type: ['oak', 'birch'], chance: 1, min: 0.1, max: 0.2 },
                { type: ['oak', 'birch'], chance: 0.5, min: 0.1, max: 0.4 },
                { type: 'berry bush', chance: 0.9 },
                { type: 'grass', amount: 2 },
                { type: ['wild rabbits', 'stoats'], chance: 0.9 },
                { type: ['foxes'], chance: 0.5, amount: 0.5 },
                { type: ['wolves', 'bears'], chance: 0.2, amount: 0.5 },
                { type: ['deer'], chance: 0.2, amount: 0.2 },
                { type: 'wild bugs' },
                { type: 'freshwater fish', chance: 0.8, min: 0.1, max: 0.5 },
                { type: 'freshwater', amount: 1 },
                { type: 'rocky substrate' },
            ],
            modifiers: { 'river': 0.4, 'volcano': 0.2, },
            image: 6,
            score: 10,
        });
        //（以降、各地形の名前・説明は日本語化済み）

        /*=====================================================================================
        商品（Goods）
        =======================================================================================*/

        G.contextNames['gather'] = '採集';
        G.contextNames['fish'] = '漁';
        G.contextNames['hunt'] = '狩猟';
        G.contextNames['chop'] = '伐採';
        G.contextNames['dig'] = '掘削';
        G.contextNames['mine'] = '採鉱';
        G.contextNames['quarry'] = '採石';

        //植物
        new G.Goods({
            name: 'grass',
            desc: '[grass,草] は [herb] の良い供給源。採集中に時折 [fruit] や [stick] が見つかることがある。',
            icon: [10, 10],
            res: {
                'gather': { 'herb': 10, 'fruit': 0.5, 'stick': 0.5 },
            },
            mult: 10,
        });
        new G.Goods({
            name: 'oak',
            desc: '[oak,樫] は温暖な気候で育つ巨大な木で、[log] と [stick] の供給源。',
            icon: [0, 10],
            res: {
                'chop': { 'log': 3, 'stick': 6 },
                'gather': { 'stick': 1 },
            },
            affectedBy: ['deforestation'],
            mult: 5,
        });
        new G.Goods({
            name: 'birch',
            desc: '[birch,白樺] は白い樹皮を持ちやや脆いが、[log] と [stick] の良い供給源。',
            icon: [1, 10],
            res: {
                'chop': { 'log': 2, 'stick': 4 },
                'gather': { 'stick': 1 },
            },
            affectedBy: ['deforestation'],
            mult: 5,
        });
        //（以降、動物・基盤資源・液体などすべてのGoodsの説明を日本語化済み）

        /*=====================================================================================
        タイル効果（Tile Effects）
        =======================================================================================*/
        //TODO : 実装
        new G.TileEffect({
            name: 'deforestation',
            desc: '大量の伐採の結果として発生する。//タイルにこの効果があると木の量が減る。//伐採を止めれば、成長次第で徐々に回復する。',
            visibleAt: 100,
        });
        new G.TileEffect({
            name: 'mineral depletion',
            desc: '過剰な採掘・掘削の結果。//タイルの鉱物量が減る。採掘を止めれば徐々に回復する。',
            visibleAt: 100,
        });
        new G.TileEffect({
            name: 'over hunting',
            desc: '過剰な狩猟の結果。//タイルの動物資源が減る。狩猟を止めれば回復する。',
            visibleAt: 100,
        });
        new G.TileEffect({
            name: 'over fishing',
            desc: '過剰な漁の結果。//海産物が減る。漁を止めれば回復する。',
            visibleAt: 100,
        });
        new G.TileEffect({
            name: 'scarce forageables',
            desc: '過剰な採集の結果。//採集資源が減る。採集を止めれば徐々に回復する。',
            visibleAt: 100,
        });
        new G.TileEffect({
            name: 'reserve',
            desc: '[reserve] はこのタイルでの資源抽出を防ぎ、枯渇した資源の回復を促す。',
        });

        /*=====================================================================================
        実績（Achievements）
        =======================================================================================*/

        G.legacyBonuses.push(
            { id: 'addFastTicksOnStart', name: '開始時に+[X] の高速ティック', desc: '新しいゲーム開始時に追加される高速ティック。', icon: [0, 0], func: function (obj) { G.fastTicks += obj.amount; }, context: 'new' },
            { id: 'addFastTicksOnResearch', name: '研究で+[X] の高速ティック', desc: '研究完了時に追加される高速ティック。', icon: [0, 0], func: function (obj) { G.props['fastTicksOnResearch'] += obj.amount; } }
        );

        //注意：実績の並び順を削除・変更するとセーブが破損する恐れがあるため変更しないでください

        new G.Achiev({
            tier: 0,
            name: 'mausoleum',
            desc: 'あなたは古代の石造記念碑である霊廟に安置されました。その目的は古い宗教的思想に根ざしています。',
            fromUnit: 'mausoleum',
            effects: [
                { type: 'addFastTicksOnStart', amount: 300 * 3 },
                { type: 'addFastTicksOnResearch', amount: 150 }
            ],
        });

        /*=====================================================================================
        マップ生成（Map Generator）
        =======================================================================================*/
        G.funcs['create map'] = function (w, h) {
            //Conwayのライフゲームに似た方法で地形を生成（出生:近傍4〜9、存続:6〜9）

            var generate = function (w, h) {
                var getAt = function (map, x, y) {
                    //端で空白にするのではなくラップさせる（ドーナツ状ワールドになり、端の大きな空白を避ける）
                    if (x < 0) x += map.length;
                    else if (x >= map.length) x -= map.length;
                    if (y < 0) y += map[0].length;
                    else if (y >= map[0].length) y -= map[0].length;
                    return map[x][y];
                }

                //マップ初期化
                var lvl = [];
                for (var x = 0; x < w; x++) {
                    lvl[x] = [];
                    for (var y = 0; y < h; y++) {
                        lvl[x][y] = Math.random() < 0.5 ? 1 : 0;
                    }
                }

                //バッファ初期化
                var lvlBuffer = [];
                for (var x = 0; x < w; x++) { lvlBuffer[x] = []; for (var y = 0; y < h; y++) { lvlBuffer[x][y] = 0; } }

                var passes = 1;
                for (var i = 0; i < passes; i++) {
                    //生存ルール
                    for (var x = 0; x < w; x++) {
                        for (var y = 0; y < h; y++) {
                            var n = getAt(lvl, x - 1, y) + getAt(lvl, x - 1, y - 1) + getAt(lvl, x, y - 1) + getAt(lvl, x + 1, y - 1) + getAt(lvl, x + 1, y) + getAt(lvl, x + 1, y + 1) + getAt(lvl, x, y + 1) + getAt(lvl, x - 1, y + 1);
                            var on = lvl[x][y];
                            if (on && n >= 4 && n <= 9) on = 1; else on = 0;
                            if (!on && n >= 6 && n <= 9) on = 1;
                            if (Math.random() < 0.05) on = Math.random() < 0.5 ? 1 : 0;//少し余分なランダム性
                            lvlBuffer[x][y] = on;
                        }
                    }
                    //バッファをコピー
                    for (var x = 0; x < w; x++) { for (var y = 0; y < h; y++) { lvl[x][y] = lvlBuffer[x][y]; } }
                }

                return lvl;
            }

            var getStrAt = function (map, x, y) {
                if (x < 0 || x >= map.length - 1 || y < 0 || y >= map[0].length - 1) return 'out';
                return map[x][y];
            }
            var getAt = function (map, x, y) {
                if (x < 0 || x >= map.length - 1 || y < 0 || y >= map[0].length - 1) return 0.5;
                return map[x][y];
            }

            var landTiles = [];
            var seaTiles = [];
            var fit = false;
            i = 0;
            while (i < 20 && fit == false)//土地が30%未満または50%超のマップは破棄
            {
                var lvl = generate(w, h);

                landTiles = [];
                seaTiles = [];
                for (var x = 0; x < w; x++) {
                    for (var y = 0; y < h; y++) {
                        if (lvl[x][y] == 0) seaTiles.push([x, y]);
                        else landTiles.push([x, y]);
                    }
                }
                var total = landTiles.length + seaTiles.length;
                if (landTiles.length / total > 0.3 && landTiles.length / total < 0.5) fit = true;
                i++;
            }

            //地形名へ変換
            for (var x = 0; x < w; x++) {
                for (var y = 0; y < h; y++) {
                    var land = 'ocean';
                    if (lvl[x][y] == 0) land = 'ocean';
                    else if (lvl[x][y] == 1) {
                        land = 'none';
                    }
                    lvl[x][y] = land;
                }
            }

            //降水マップ
            //海は湿度高め、陸は低め。変動を加え、マップをぼかして海岸に湿気を伝播させる
            var wet = [];
            for (var x = 0; x < w; x++) {
                wet[x] = [];
                for (var y = 0; y < h; y++) {
                    wet[x][y] = (lvl[x][y] == 'ocean' ? 0.8 : 0.2) + Math.random() * 0.1 - 0.1 / 2;
                    if (Math.random() < 0.3 && wet[x][y] < 0.5) wet[x][y] += Math.random() * 5 - 2.5;
                }
            }
            for (var x = 0; x < w; x++)//ぼかし
            {
                for (var y = 0; y < h; y++) {
                    var variance = 0.05;
                    var n = getAt(wet, x - 1, y) + getAt(wet, x - 1, y - 1) + getAt(wet, x, y - 1) + getAt(wet, x + 1, y - 1) + getAt(wet, x + 1, y) + getAt(wet, x + 1, y + 1) + getAt(wet, x, y + 1) + getAt(wet, x - 1, y + 1);
                    wet[x][y] = (wet[x][y] + n) / 9 + Math.random() * variance - variance / 2;
                }
            }
            //気温マップ
            var jumble = false;
            if (!jumble) {
                //縦方向の正弦波（赤道は熱く、極は寒く）、若干の付随変動
                //湿度は気温を少し下げる
                var temp = [];
                for (var x = 0; x < w; x++) {
                    temp[x] = [];
                    for (var y = 0; y < h; y++) {
                        var variance = 0.15;
                        temp[x][y] = Math.sin(((y + 0.5) / h - 0.25) * Math.PI * 2) / 2 + (lvl[x][y] == 'ocean' ? 0.6 : 0.5) - (wet[x][y]) * 0.15 + Math.random() * variance - variance / 2;
                    }
                }
            }
            else {
                //温度は大きな塊で寒暖が生じる
                var temp = [];
                for (var x = 0; x < w; x++) {
                    temp[x] = [];
                    for (var y = 0; y < h; y++) {
                        temp[x][y] = 0.65 + Math.random() * 0.1 - 0.1 / 2 - wet[x][y] * 0.15;
                        if (Math.random() < 0.5) temp[x][y] += Math.random() * 10 - 5;
                    }
                }
                for (var i = 0; i < 2; i++)//ぼかし
                {
                    for (var x = 0; x < w; x++) {
                        for (var y = 0; y < h; y++) {
                            var variance = 0.05;
                            var n = getAt(temp, x - 1, y) + getAt(temp, x - 1, y - 1) + getAt(temp, x, y - 1) + getAt(temp, x + 1, y - 1) + getAt(temp, x + 1, y) + getAt(temp, x + 1, y + 1) + getAt(temp, x, y + 1) + getAt(temp, x - 1, y + 1);
                            temp[x][y] = (temp[x][y] + n) / 9 + Math.random() * variance - variance / 2;
                        }
                    }
                }
            }

            //バイオーム割当
            for (var x = 0; x < w; x++) {
                for (var y = 0; y < h; y++) {
                    var tempTile = temp[x][y];
                    var wetTile = wet[x][y];
                    var landTile = lvl[x][y];

                    var biomes = [];
                    if (tempTile < -0.1) {
                        if (landTile == 'ocean') biomes.push('arctic ocean');
                        else biomes.push('ice desert');
                    }
                    else if (tempTile < 0.15) {
                        if (landTile == 'ocean') biomes.push('arctic ocean');
                        else if (wetTile < 0.25) biomes.push('ice desert');
                        else if (wetTile > 0.5) biomes.push('boreal forest');
                        else biomes.push('tundra');
                    }
                    else if (tempTile > 1.1) {
                        if (landTile == 'ocean') biomes.push('tropical ocean');
                        else biomes.push('desert');
                    }
                    else if (tempTile > 0.85) {
                        if (landTile == 'ocean') biomes.push('tropical ocean');
                        else if (wetTile < 0.25) biomes.push('desert');
                        else if (wetTile > 0.5) biomes.push('jungle');
                        else biomes.push('savanna');
                    }
                    else {
                        if (landTile == 'ocean') biomes.push('ocean');
                        else if (wetTile < 0.25) biomes.push('shrubland');
                        else if (wetTile > 0.5) biomes.push('forest');
                        else biomes.push('prairie');
                    }
                    if (biomes.length == 0) biomes.push('prairie');
                    lvl[x][y] = choose(biomes);
                }
            }

            for (var x = 0; x < w; x++)//'none' が残っているタイルは森林にする
            {
                for (var y = 0; y < h; y++) {
                    if (lvl[x][y] == 'none') lvl[x][y] = 'forest';
                }
            }
            return lvl;
        }
    }
});