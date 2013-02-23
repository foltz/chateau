class Router extends Backbone.Router
    routes:
        '': 'login'
        'login': 'login'
        'home': 'home'
    
    initialize: =>
        @view_container = $('#content_wrapper')
        @connected = false
        if not window.server?
            @navigate 'login'
            @login()
        else
            @server = window.server
            @check_settings()

    login: =>
        if @connected is true
            @navigate 'home', {trigger: true}
        else
            @view?.destroy()
            @view = new LoginView
            @view_container.html @view.render().$el

    home: =>
        if @connected is true
            @view?.destroy()
            @view = new HomeView
            @view_container.html @view.render().$el
        else
            @view?.destroy()
            @view = new LoginView
            @view_container.html @view.render({checking: true}).$el


    check_settings: =>
        $.ajax
            url: "/config/check"
            type: 'POST'
            contentType: 'application/json'
            data: JSON.stringify
                host: @server.host
                port: @server.port
                http_port: @server.http_port
                id: window.id
            success: @ajax_success_check
            error: @ajax_fail_check

    ajax_success_check: (data) =>
        data = JSON.parse data
        if data.connection_rdb is 'ok'
            if data.connection_http is 'ok'
                @connected = true
                route = Backbone.history.fragment
                Backbone.history.fragment = null
                @navigate route, {trigger: true}
            else if data.connection_http is 'fail'
                Backbone.history.fragment = null
                @navigate 'login'
                @view?.destroy()
                @view = new LoginView
                @view_container.html @view.render({connection_http_fail: true}).$el
        else
            Backbone.history.fragment = null
            @navigate 'login'
            @view?.destroy()
            @view = new LoginView
            @view_container.html @view.render({connection_rdb_fail: true}).$el



    ajax_fail_check: =>
        @render
            error: @login_error {ajax_fail: true}




Backbone.View.prototype.destroy = ->
    return 0