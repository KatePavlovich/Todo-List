class ToDoListAjaxDataService {
    initializeTasks(successCallBack) {
        $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            data: {
                widgetId: 123754,
            },

            success: function (data) {
                let tasksArr = data.map((i) => (i.original));

                successCallBack(tasksArr);
            },
            type: "get"
        })
    }

    createTask(title, successCallBack) {

        $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            type: "post",
            data: {
                widgetId: 123754,
                title: title,
            },
            success: function (response) {
                debugger;
                successCallBack(response.task);
            },
        })

    }
}