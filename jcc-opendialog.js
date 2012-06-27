/**
 * Project: jcc confirm Dialog
 * Description: dynamic diloag. extends jqueryui dialog()
 * Author: Martin von Loh 
 * Version: 1.2.1
 * Dual MIT/BSD license
 */

;(function ( $, window, document, undefined ) {

    var pluginName = 'open_dialog',
        defaults = {
            href        : '',
            method	: 'link',
            dataType	: 'script',
            response	: '',
            ajaxtype	: 'GET',
            dialogtitle : 'title',
            dialogtext  : 'text',
            dialogclass : 'message error',
            dialogheight: 220,
            dialogwidth : 400,
            dialogid    : 'dialog',
            messageid   : 'dialogchange',
            modal       : true
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = jQuery.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        defaults = this.options;
        this.init();
    }

    Plugin.prototype.init = function () {
    };
    
    var creatediv = function(){
        var d=document.createElement('div');
        jQuery(d).html(defaults.dialogtext)
                .append('<div id="'+defaults.messageid+'"></div>')
                .attr('id',defaults.dialogid)
                .attr('title', defaults.dialogtitle);
                jQuery('body').append(jQuery(d));     
        jQuery(defaults.messageid).html(defaults.dialogtext);
        jQuery(d).dialog({
                bgiframe: true, 
                autoOpen: false, 
                height: defaults.dialogheight, 
                width: defaults.dialogwidth, 
                modal: defaults.modal, 
                dialogClass: defaults.dialogclass, 
                close:function(){
                        jQuery(d).remove();
                }
        });
    };
    
    var ajax_dialog = function(){
        jQuery('#dialog').dialog( "option", "buttons", { "Ok": function() { 
            $$ = jQuery(this);
            jQuery.ajax({
                type: defaults.ajaxtype,
                url: defaults.href,
                dataType: defaults.dataType,
                success: function(data) {
                    $$.dialog("close"); 
                    if(jQuery().jGrowl){
                        if (defaults.response!=''){
                            jQuery.jGrowl(defaults.response);
                        }
                    }
                    else{
                        if (defaults.response!=''){
                           alert(defaults.response);
                        }
                    }
                }
            });
        }, "Abbrechen": function() {
                        jQuery(this).dialog("close"); 
            } } );
    };
    
    var normal_dialog = function(){
        jQuery('#dialog').dialog("option", "buttons", { "Ok": function() { 
                document.location.href="" + defaults.href ; 
        }, "Abbrechen": function() {
                    jQuery(this).dialog("close"); 	 
        } } );
		
    }

    jQuery.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!jQuery.data(this, 'plugin_' + pluginName)) {
                jQuery.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                jQuery(this).live('click',function(event){
                    event.preventDefault();
                    button = jQuery(this);
                    if (defaults.dialogtext!='' 
                        && (button.attr('rel')!= null && button.attr('rel')!='')){
                        defaults.dialogtext = button.attr('rel');
                    }
                    if (defaults.href != '' 
                        || (button.attr('href')!= null && button.attr('href')!='')){
                        defaults.href = button.attr('href');
                    }
                    if (defaults.dialogtitle != '' 
                        && (button.attr('title')!= null && button.attr('title')!='')){
                        defaults.dialogtitle = button.attr('title');
                    }
                    creatediv();
                    if (defaults.method=='ajax'){
                        ajax_dialog();
                    }
                    if (defaults.method == 'link'){
                        normal_dialog();
                    }
                    jQuery('#'+defaults.dialogid).dialog('open');
                    return false;
                })
            }
        });
    }

})( jQuery, window, document );