class ToDoListAjaxDataService {
    initializeTasks(successCallBack) {
        $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            data: {
                widgetId: 123754,
                count: 100
            },

            success: function (data) {
                successCallBack(data);
            },
            type: "get"
        })
    }

     _sendRequest(type, successCallBack, title, taskId, done) {
        $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            type,
            data: {
                widgetId: 123754,
                title,
                taskId,
                done
            },
            success: function (data) {
                successCallBack(data);
            },
        })
    } 

}