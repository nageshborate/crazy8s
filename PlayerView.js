exports.getPlayerView = function(AppData, player)
{
    return `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crazy 8s</title>
    </head>
    <body>
        <div id="root"></div>
        <input type=hidden id=selectedplayer value='${ player }' />
        <script src="playerview.bundle.js"></script>
    </body>
    </html>
    `;
};