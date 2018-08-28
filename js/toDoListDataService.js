class ToDoListAjaxDataService {
    initializeTasks(successCallBack) {
        $.ajax({
            url: 'https://repetitora.net/api/JS/Tasks',
            data: {
                widgetId: 123754,
            },

            success: function (data) {
                console.log(data);
                let tasksArr = data.map((i) => (i.title));

                successCallBack(tasksArr);
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
                title: title,
            },
            success: function (response) {
                debugger;
                successCallBack(response);
            },
        })

    }
}