class ToDoListAjaxDataService {
    initializeTasks() {
       return  $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            type: "get",
            data: {
                widgetId: 123754,
                count: 100
            }           
        })
    }

    createTask(title) {
        return $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            type: "POST",
            data: {
                widgetId: 123754,
                title: title
            }
        })
    }

    deleteTask(taskId, successCallBack) {

        $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            type: "delete",
            data: {
                widgetId: 123754,
                taskId
            },
            success: function (data) {
                successCallBack(data);
            },
        })
    }

    updateTask(taskId, title, done, successCallBack) {

        $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            type: "put",
            data: {
                widgetId: 123754,
                taskId,
                title,
                done
            },
            success: function (data) {
                successCallBack(data);
            },
        })
    }
}