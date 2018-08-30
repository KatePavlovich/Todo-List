class ToDoListAjaxDataService {
    initializeTasks(successCallBack) {
        $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            data: {
                widgetId: 123754,
            },

            success: function (data) {
                successCallBack(data);
            },
            type: "get"
        })
    }

    createTask(title, successCallBack) {

        $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            type: "POST",
            data: {
                widgetId: 123754,
                title: title
            },
            success: function (response) {
                successCallBack(response);
            },
        })

    }

    deleteTask(taskId, successCallBack) {

        $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            type: "delete",
            data: {
                widgetId: 123754,
                taskId : taskId 
            },
            success: function (data) {
                console.log(data);

                successCallBack(data);
            },
        })

    }
}