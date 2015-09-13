app.menuManager = (function() {
    var isHover = false,
        size = {
            h: 1000,
            v: 500
        },
        box = [
            [0, 0],
            [40, 300],
            [5, 500],
            [600, 490],
            [1000, 570],
            [920, -40],
            [0, 0]
        ],
        button = [
            [0, 0],
            [0, 60],
            [70, 55],
            [200, 65],
            [170, 0],
            [120, 6],
            [0, 0]
        ],
        buttonPosition = [0, 0],
        _show = function() {
            app.menu = true;
        },
        _hide = function() {
            isHover = false;
            app.menu = false;
        },
        _draw = function() {
            var i, x, y;

            x = (app.settings.size.x - size.h) / 2;
            y = (app.settings.size.y - size.v) / 2 - 100;
            if (y < 0 ) {
                y = (app.settings.size.y - size.v) / 2;
            }
            app.context.save();
            app.context.translate(x, y);
            app.context.beginPath();
            app.context.moveTo(box[0][0], box[0][1]);
            for (i = 1; i < box.length; i++) {
                app.context.lineTo(box[i][0], box[i][1]);
            }
            app.context.fillStyle = '#000000';
            app.context.fill();

            buttonPosition[0] = x;
            buttonPosition[1] = y;
            if (app.isGameOver) {
                _drawGameOverText();
            } else {
                _drawText();
            }

            _drawButton();

            app.context.restore();
        },
        _checkClick = function(touch) {
            if (isHover) {
                _hide();
                app.levelManager.nextLevel();
            }
            if (touch) {
                if (buttonPosition[0] <= app.mouse.x &&
                    buttonPosition[0] + 200 >= app.mouse.x &&
                    buttonPosition[1] <= app.mouse.y &&
                    buttonPosition[1] + 60 >= app.mouse.y) {
                    _hide();
                    app.levelManager.nextLevel();
                }
            }
        },
        _checkMove = function() {
            isHover = buttonPosition[0] <= app.mouse.x &&
                buttonPosition[0] + 200 >= app.mouse.x &&
                buttonPosition[1] <= app.mouse.y &&
                buttonPosition[1] + 60 >= app.mouse.y;
        },
        _drawGameOverText = function() {
            app.context.font = '48px Arial';
            app.context.textBaseline = 'middle';
            app.context.textAlign = 'center';
            app.context.fillStyle = 'darkorange';
            app.context.fillText('Fruit rev.', size.h / 2, 64);

            app.context.font = '160px Arial';
            app.context.textBaseline = 'middle';
            app.context.textAlign = 'center';
            app.context.fillStyle = 'darkred';
            app.context.fillText('Game Over', size.h / 2, size.v / 2);
        },
        _drawText = function() {
            app.context.font = '48px Arial';
            app.context.textBaseline = 'middle';
            app.context.textAlign = 'center';
            app.context.fillStyle = 'darkorange';
            app.context.fillText('Fruit rev.', size.h / 2, 40);

            app.context.font = '20px Arial';
            app.context.textBaseline = 'middle';
            app.context.textAlign = 'center';
            app.context.fillStyle = '#f5f6d4';
            app.context.fillText('Have you ever thought where are all those sliced fruits after playing the well known game?', size.h / 2, 120);
            app.context.fillText('Now you will see some of them and you will be able to reverse slicing. So just try it!', size.h / 2, 150);
            app.context.fillStyle = 'darkorange';
            app.context.fillText('How you should do that?', size.h / 2, 210);
            app.context.fillStyle = '#f5f6d4';
            app.context.fillText('Just click on half of fruit and move it to another one of certain fruit. And that`s all.', size.h / 2, 240);
            app.context.fillText('If you connect different halves of fruit you will get twice points.', size.h / 2, 270);
            app.context.fillText('Don`t forget about progress bar at the bottom of the screen.', size.h / 2, 300);
            app.context.fillText('When it runs out you will lose, in another case you will play next level.', size.h / 2, 330);
            app.context.fillStyle = 'darkorange';
            app.context.fillText('Enjoy it!', size.h / 2, 390);

            app.context.font = '12px Arial';
            app.context.fillStyle = 'darkyellow';
            app.context.fillText('developed by Viktor Uhryn special for js13kGames', 160, 480);
        },
        _drawButton = function() {
            var i;
            buttonPosition[0] += (size.h - 250);
            buttonPosition[1] += (size.v - 100);
            app.context.save();
            app.context.translate(size.h - 250, size.v - 100);
            app.context.beginPath();
            app.context.moveTo(button[0][0], button[0][1]);
            for (i = 1; i < button.length; i++) {
                app.context.lineTo(button[i][0], button[i][1]);
            }
            if (isHover) {
                app.context.fillStyle = '#f5f6d4';
            } else {
                app.context.fillStyle = '#ffffff';
            }
            app.context.fill();
            app.context.font = '48px Arial';
            app.context.textBaseline = 'middle';
            app.context.textAlign = 'center';
            app.context.fillStyle = '#000000';
            app.context.fillText('Play', 100, 30);
            app.context.restore();
        };
    return {
        show: _show,
        draw: _draw,
        checkClick: _checkClick,
        checkMove: _checkMove
    };
})();