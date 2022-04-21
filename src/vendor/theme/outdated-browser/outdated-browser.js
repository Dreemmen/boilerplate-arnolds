cookie_set = function( name, value, days ) {

    var expires;

    if ( days ) {
        var date = new Date();

        date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
        expires = '; expires=' + date.toGMTString();
    } else {
        expires = '';
    }

    document.cookie = name + '=' + value + expires + '; path=/';

}

cookie_get = function( name ) {

    if ( document.cookie.length > 0 ) {
        var start = document.cookie.indexOf( name + '=' );
        var end;

        if ( start != -1 ) {
            start = start + name.length + 1;
            end   = document.cookie.indexOf( ';', start );

            if ( end == -1 ) {
                end = document.cookie.length;
            }

            return unescape( document.cookie.substring( start, end ) );
        }
    }

    return '';

}

function browser_add_notice() {

    if ( cookie_get( 'hide_browser_notice' ) ) {
        return;
    }

    document.body.classList.add( 'show-browser-notice' );

    var close = document.getElementById( 'ubn-close' );
    var wrap  = document.getElementById( 'update-browser-notification-wrap' );

    close.onclick = function() {
        wrap.parentNode.removeChild( wrap );

        cookie_set( 'hide_browser_notice', 'yes', 365 );
    };

}
window.onload = browser_add_notice;