/**
 * Project: jcc confirm Dialog
 * Description: dynamic diloag. extends jqueryui dialog()
 * Author: Martin von Loh 
 * Version: 1.2
 * License: GPLv3
 */

;(function ( $, window, document, undefined ) {

    var pluginName = 'open_dialog',
        defaults = {
            href	: '',
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
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        defaults = this.options;
        this.init();
    }

    Plugin.prototype.init = function () {
    };
    
    var creatediv = function(){
        var d=document.createElement('div');
        $(d).html(defaults.dialogtext)
                .append('<div id="'+defaults.messageid+'"></div>')
                .attr('id',defaults.dialog.id)
                .attr('title', defaults.dialogtitle);
                $('body').append($(d));     
        $(defaults.messageid).html(defaults.dialogtext);
        jQuery(d).dialog({
                bgiframe: true, 
                autoOpen: false, 
                height: defaults.dialogheight, 
                width: defaults.dialogwidth, 
                modal: defaults.modal, 
                dialogClass: defaults.dialogclass, 
                close:function(){
                        $(d).remove();
                }
        });
    };
    
    var ajax_dialog = function(){
        $('#dialog').dialog( "option", "buttons", { "Ok": function() { 
            $$ = $(this);
            $.ajax({
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
                        $(this).dialog("close"); 
            } } );
    };
    
    var normal_dialog = function(){
        $('#dialog').dialog("option", "buttons", { "Ok": function() { 
                document.location.href="" + defaults.href ; 
        }, "Abbrechen": function() {
                    $(this).dialog("close"); 	 
        } } );
		
    }

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                $(this).live('click',function(event){
                    event.preventDefault();
                    button = $(this);
                    if (defaults.dialogtext!='' 
                        && (button.attr('rel')!= null && button.attr('rel')!='')){
                        defaults.dialogtext = button.attr('rel');
                    }
                    if (defaults.href != '' 
                        && (button.attr('href')!= null && button.attr('href')!='')){
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
                    $('#dialog').dialog('open');
                    return false;
                })
            }
        });
    }

})( jQuery, window, document );