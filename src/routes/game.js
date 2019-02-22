const express = require('express');
const router = express.Router();

const request = require('request');

const pool = require('../database');
const passport = require('passport');
const { estaConectado } = require('../lib/comprobarAuth');


router.get('/play', estaConectado, async (req, res) => {
    const usuario = req.user.username;
    const etsisiCoins = req.user.etsisiCoins;
    const caffeine = req.user.CaffeineBar;
    const skin = req.user.skin;
    var bestPlayer, Maxpuntuacion;
    const mejor = await pool.query('SELECT * FROM Games WHERE gameName="Miñano Clicker" ORDER BY gameScore DESC LIMIT 1');
    if(mejor.length>0){
        bestPlayer = mejor[0].userScore;
        Maxpuntuacion = mejor[0].gameScore;
    }



    const def = "default";
    const rowsInv = await pool.query('SELECT * FROM Inventario WHERE (idOwner = ? AND skinName = ?)', [req.user.id, def]);
    if (rowsInv.length < 1) {
        await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["default", req.user.id]);
    }

    var hasDeepfried, hasWhiteBear, hasMinnanor, hasMinnand, hasMinor, hasMinand, hasMinan420, hasSkinError, hasGitHub;

    const row_sk0 = await pool.query('SELECT * FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "deepfried"]);
    const row_sk1 = await pool.query('SELECT * FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "whitebear"]);
    const row_sk2 = await pool.query('SELECT * FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "miñanor"]);
    const row_sk3 = await pool.query('SELECT * FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "miñand"]);
    const row_sk4 = await pool.query('SELECT * FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "minor"]);
    const row_sk5 = await pool.query('SELECT * FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "minand"]);
    const row_sk6 = await pool.query('SELECT * FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "miñan420"]);
    const row_sk7 = await pool.query('SELECT * FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "skinerror"]);
    const row_sk8 = await pool.query('SELECT * FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "github"]);

    if (row_sk0.length > 0) hasDeepfried = true; else hasDeepfried = false;
    if (row_sk1.length > 0) hasWhiteBear = true; else hasWhiteBear = false;
    if (row_sk2.length > 0) hasMinnanor = true; else hasMinnanor = false;
    if (row_sk3.length > 0) hasMinnand = true; else hasMinnand = false;
    if (row_sk4.length > 0) hasMinor = true; else hasMinor = false;
    if (row_sk5.length > 0) hasMinand = true; else hasMinand = false;
    if (row_sk6.length > 0) hasMinan420 = true; else hasMinan420 = false;
    if (row_sk7.length > 0) hasSkinError = true; else hasSkinError = false;
    if (row_sk8.length > 0) hasGitHub = true; else hasGitHub = false;

    res.render('game/game', { usuario, Maxpuntuacion, etsisiCoins, caffeine, skin, hasDeepfried, hasWhiteBear, hasMinnand, hasMinnanor, hasMinor, hasMinand, hasMinan420, hasSkinError, hasGitHub, bestPlayer });
});

router.post('/play', async (req, res) => {
    const { skin } = req.body;
    await pool.query('UPDATE usuarios set skin=? WHERE id = ?', [skin, req.user.id]);
    req.flash('success', 'Skin cambiada');
    res.redirect('/play');
});

router.post('/loot', async (req, res) => {
    var etsisiCoins = req.user.etsisiCoins;
    var cafeina = req.user.CaffeineBar;
    cafeina = cafeina + 100;
    etsisiCoins = etsisiCoins + 100;
    if (cafeina > 100) cafeina = 100;

    await pool.query('UPDATE usuarios set etsisiCoins=? WHERE id = ?', [etsisiCoins, req.user.id]);
    await pool.query('UPDATE usuarios set CaffeineBar=? WHERE id = ?', [cafeina, req.user.id]);
    await pool.query('UPDATE usuarios set lastLoot=CURRENT_TIMESTAMP WHERE id = ?', [req.user.id]);

    var skinObtenida = false;
    var hasDeepfried, hasWhiteBear, hasMinnanor, hasMinnand, hasMinor, hasMinand, hasMinan420, hasSkinError, hasGitHub;

    var row_sk0 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "deepfried"]);
    var row_sk1 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "whitebear"]);
    var row_sk2 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "miñanor"]);
    var row_sk3 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "miñand"]);
    var row_sk4 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "minor"]);
    var row_sk5 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "minand"]);
    var row_sk6 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "miñan420"]);
    var row_sk7 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "skinerror"]);
    var row_sk8 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "github"]);

    if (row_sk0.length > 0) hasDeepfried = true; else hasDeepfried = false;
    if (row_sk1.length > 0) hasWhiteBear = true; else hasWhiteBear = false;
    if (row_sk2.length > 0) hasMinnanor = true; else hasMinnanor = false;
    if (row_sk3.length > 0) hasMinnand = true; else hasMinnand = false;
    if (row_sk4.length > 0) hasMinor = true; else hasMinor = false;
    if (row_sk5.length > 0) hasMinand = true; else hasMinand = false;
    if (row_sk6.length > 0) hasMinan420 = true; else hasMinan420 = false;
    if (row_sk7.length > 0) hasSkinError = true; else hasSkinError = false;
    if (row_sk8.length > 0) hasGitHub = true; else hasGitHub = false;

    var hasAllSkin = false;
    if (hasDeepfried && hasWhiteBear && hasMinnanor && hasMinnand && hasMinor && hasMinand && hasMinan420 && hasSkinError && hasGitHub) hasAllSkin = true;

    while (!skinObtenida) {
        if (hasAllSkin) skinObtenida=true;
        console.log(skinObtenida + "--------------");
        let ran = Math.floor(Math.random() * 9);
        console.log(ran)
        switch (ran) {
            case 0:
                if (!hasDeepfried && !skinObtenida) {
                    await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["deepfried", req.user.id]);
                    hasDeepfried = true;
                    skinObtenida = true;
                }
                break;
            case 1:
                if (!hasWhiteBear && !skinObtenida) {
                    await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["whitebear", req.user.id]);
                    hasWhiteBear = true;
                    skinObtenida = true;
                }
                break;
            case 2:
                if (!hasMinnanor && !skinObtenida) {
                    await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["miñanor", req.user.id]);
                    hasMinnanor = true;
                    skinObtenida = true;
                }
                break;
            case 3:
                if (!hasMinnand && !skinObtenida) {
                    await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["miñand", req.user.id]);
                    hasMinnand = true;
                    skinObtenida = true;
                }
                break;
            case 4:
                if (!hasMinor && !skinObtenida) {
                    await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["minor", req.user.id]);
                    hasMinor = true;
                    skinObtenida = true;
                }
                break;
            case 5:
                if (!hasMinand && !skinObtenida) {
                    await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["minand", req.user.id]);
                    hasMinand = true;
                    skinObtenida = true;
                }
                break;
            case 6:
                if (!hasMinan420 && !skinObtenida) {
                    await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["miñan420", req.user.id]);
                    hasMinan420 = true;
                    skinObtenida = true;
                }
                break;
            case 7:
                if (!hasSkinError && !skinObtenida) {
                    await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["skinerror", req.user.id]);
                    hasSkinError = true;
                    skinObtenida = true;
                }
                break;
            case 8:
                if (!hasGitHub && !skinObtenida) {
                    await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["github", req.user.id]);
                    hasDeepfried = true;
                    hasGitHub = true;
                }
                break;
        }
    }
    //await pool.query('UPDATE usuarios set skin=? WHERE id = ?', [skin, req.user.id]);
    //req.flash('success', 'Skin cambiada');
    //res.redirect('/play');
});


router.post('/ganasDinero', async (req, res) => {
    let ECganados = req.body.EC;
    let etsisiCoins = req.user.etsisiCoins + parseInt(ECganados);
    console.log("etsisicoins: " + etsisiCoins);
    await pool.query('UPDATE usuarios set etsisiCoins=? WHERE id = ?', [etsisiCoins, req.user.id]);
    res.send();
});

router.post('/minClicker', async (req, res) => {
    let clicks = req.body.clicks;
    const nomGame = "Miñano Clicker"
    const rows = await pool.query('SELECT * FROM Games WHERE (userScore = ? AND gameName = ?)', [req.user.username, nomGame]);
    if (rows.length > 0) {
        const row2 = await pool.query('SELECT * FROM Games WHERE (gameScore < ? AND userScore = ?)', [clicks, req.user.username]);
        if (row2.length > 0) await pool.query('UPDATE Games set gameScore=? WHERE userScore = ?', [clicks, req.user.username]);
    } else {
        const result = await pool.query('INSERT INTO Games (gameName,gameScore,userScore) VALUES (?,?,?)', [nomGame, clicks, req.user.username]);
    }
    res.send(clicks);
});

router.get('/play/mClicker', estaConectado, async (req, res) => {
    const usuario = req.user.username;
    const nomGame = "Miñano Clicker"
    const cafeina = req.user.CaffeineBar;
    const etsisiCoins = req.user.etsisiCoins;
    if (cafeina < 20) res.redirect('/play');
    else {
        let mcafeina = cafeina - 20;
        await pool.query('UPDATE usuarios set CaffeineBar=? WHERE username = ?', [mcafeina, req.user.username]);
        const id = req.user.id;
        const skin = req.user.skin;
        const rows = await pool.query('SELECT gameScore FROM Games WHERE (userScore = ? AND gameName = ?)', [req.user.username, nomGame]);
        let highScore = 0;
        if (rows.length > 0) {
            highScore = rows[0].gameScore;
        }
        console.log("\n\n" + skin + "\n\n");
        res.render('game/miñanoClicker', { usuario, cafeina, etsisiCoins, id, skin, highScore });
    }

});

router.get('/cafe', estaConectado, async (req, res) => {
    const usuario = req.user.username;
    const id = "";
    res.render('game/cafe', { usuario, id });
});

router.get('/cafe/:id', estaConectado, async (req, res) => {
    const { id } = req.params;
    const usuario = req.user.username;
    const etsisiCoins = req.user.etsisiCoins;
    const lastLoot = req.user.lastLoot;

    res.render('game/cafe', { usuario, id, etsisiCoins, lastLoot });
});

router.post('/coffeeshell-bcc', async (req, res) => {
    const { comando } = req.body;
    let etsisiCoins = req.user.etsisiCoins;
    let cafeina = req.user.CaffeineBar;
    if (comando == "y" || comando == "Y") {
        if (etsisiCoins >= 10) {
            etsisiCoins = etsisiCoins - 10;
            cafeina = cafeina + 40;
            if (cafeina > 100) cafeina = 100;
            await pool.query('UPDATE usuarios set etsisiCoins=? WHERE id = ?', [etsisiCoins, req.user.id]);
            await pool.query('UPDATE usuarios set CaffeineBar=? WHERE id = ?', [cafeina, req.user.id]);
            res.redirect('/cafe');
        } else {
            res.redirect('/cafe/errCafe');
        }
    } else {
        res.redirect('/cafe');
    }

});

router.post('/coffeeshell-bcb', async (req, res) => {
    const { comando } = req.body;
    let etsisiCoins = req.user.etsisiCoins;
    let cafeina = req.user.CaffeineBar;
    if (comando == "y" || comando == "Y") {
        if (etsisiCoins >= 20) {
            etsisiCoins = etsisiCoins - 20;
            cafeina = cafeina + 85;
            if (cafeina > 100) cafeina = 100;
            await pool.query('UPDATE usuarios set etsisiCoins=? WHERE id = ?', [etsisiCoins, req.user.id]);
            await pool.query('UPDATE usuarios set CaffeineBar=? WHERE id = ?', [cafeina, req.user.id]);
            res.redirect('/cafe');
        } else {
            res.redirect('/cafe/errCafe');
        }
    } else {
        res.redirect('/cafe');
    }
});

router.post('/coffeeshell-bs', async (req, res) => {
    const { comando } = req.body;
    var etsisiCoins = req.user.etsisiCoins;
    console.log("comando:  " + comando);
    if (comando == "y" || comando == "Y") {
        if (etsisiCoins >= 35) {
            etsisiCoins = etsisiCoins - 35;
            var skinBuyed = false;
            var hasDeepfried, hasWhiteBear, hasMinnanor, hasMinnand, hasMinor, hasMinand, hasMinan420, hasSkinError, hasGitHub;

            var row_sk0 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "deepfried"]);
            var row_sk1 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "whitebear"]);
            var row_sk2 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "miñanor"]);
            var row_sk3 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "miñand"]);
            var row_sk4 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "minor"]);
            var row_sk5 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "minand"]);
            var row_sk6 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "miñan420"]);
            var row_sk7 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "skinerror"]);
            var row_sk8 = await pool.query('SELECT skinName, idOwner FROM Inventario WHERE idOwner=? AND skinName=?', [req.user.id, "github"]);

            if (row_sk0.length > 0) hasDeepfried = true; else hasDeepfried = false;
            if (row_sk1.length > 0) hasWhiteBear = true; else hasWhiteBear = false;
            if (row_sk2.length > 0) hasMinnanor = true; else hasMinnanor = false;
            if (row_sk3.length > 0) hasMinnand = true; else hasMinnand = false;
            if (row_sk4.length > 0) hasMinor = true; else hasMinor = false;
            if (row_sk5.length > 0) hasMinand = true; else hasMinand = false;
            if (row_sk6.length > 0) hasMinan420 = true; else hasMinan420 = false;
            if (row_sk7.length > 0) hasSkinError = true; else hasSkinError = false;
            if (row_sk8.length > 0) hasGitHub = true; else hasGitHub = false;

            var hasAllSkin = false;
            if (hasAllSkin) etsisiCoins = etsisiCoins + 35;

            await pool.query('UPDATE usuarios set etsisiCoins=? WHERE id = ?', [etsisiCoins, req.user.id]);
            if (hasDeepfried && hasWhiteBear && hasMinnanor && hasMinnand && hasMinor && hasMinand && hasMinan420 && hasSkinError && hasGitHub) hasAllSkin = true;

            while (!skinBuyed) {
                if (hasAllSkin) res.redirect('/cafe');
                console.log(skinBuyed + "--------------");
                let ran = Math.floor(Math.random() * 9);
                console.log(ran)
                switch (ran) {
                    case 0:
                        if (!hasDeepfried) {
                            await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["deepfried", req.user.id]);
                            hasDeepfried = true;
                            skinBuyed = true;
                        }
                        break;
                    case 1:
                        if (!hasWhiteBear) {
                            await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["whitebear", req.user.id]);
                            hasWhiteBear = true;
                            skinBuyed = true;
                        }
                        break;
                    case 2:
                        if (!hasMinnanor) {
                            await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["miñanor", req.user.id]);
                            hasMinnanor = true;
                            skinBuyed = true;
                        }
                        break;
                    case 3:
                        if (!hasMinnand) {
                            await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["miñand", req.user.id]);
                            hasMinnand = true;
                            skinBuyed = true;
                        }
                        break;
                    case 4:
                        if (!hasMinor) {
                            await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["minor", req.user.id]);
                            hasMinor = true;
                            skinBuyed = true;
                        }
                        break;
                    case 5:
                        if (!hasMinand) {
                            await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["minand", req.user.id]);
                            hasMinand = true;
                            skinBuyed = true;
                        }
                        break;
                    case 6:
                        if (!hasMinan420) {
                            await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["miñan420", req.user.id]);
                            hasMinan420 = true;
                            skinBuyed = true;
                        }
                        break;
                    case 7:
                        if (!hasSkinError) {
                            await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["skinerror", req.user.id]);
                            hasSkinError = true;
                            skinBuyed = true;
                        }
                        break;
                    case 8:
                        if (!hasGitHub) {
                            await pool.query('INSERT INTO Inventario (skinName,idOwner) VALUES (?,?)', ["github", req.user.id]);
                            hasDeepfried = true;
                            hasGitHub = true;
                        }
                        break;

                    default:
                        break;
                }
            }

            res.redirect('/cafe');
        } else {
            res.redirect('/cafe/errCafe');
        }
    } else {
        res.redirect('/cafe');
    }
});

router.post('/coffeeshell-hack', async (req, res) => {
    const { comando } = req.body;
    const etsisiCoins = req.user.etsisiCoins;
    const lastLoot = req.user.lastLoot;

});

router.post('/coffeeshell', async (req, res) => {
    const { comando } = req.body;

    switch (comando) {
        case 'help':
            res.redirect('/cafe/help');
            break;
        case 'ls':
            res.redirect('/cafe/ls');
            break;
        case 'buy':
            res.redirect('/cafe/buy');
            break;
        case 'buy -c':
            res.redirect('/cafe/buy -c');
            break;
        case 'buy -c cafe':
            res.redirect('/cafe/buy -c cafe');
            break;
        case 'buy -c bb':
            res.redirect('/cafe/buy -c bb');
            break;
        case 'buy -s':
            res.redirect('/cafe/buy -s');
            break;
        case ':q':
            res.redirect('/play');
            break;

        case './hack.sh':
            res.redirect('/cafe/hacky');
            break;

        default:
            res.redirect('/cafe/' + comando);
            break;
    }

});

module.exports = router;