webix.ready(function () {
    webix.ui({
        type:"line",
        container: "app",// #app => div
        id: "root",// можем обращатся через $$
        height:1000,
        rows:[
            { view:"toolbar",
                id:"top_toolbar",
                elements:[
                    { view:"button", id:"btn_save", autowidth:true, value:"Save",click:saveItem},
                    { view:"button", id:"btn_del", autowidth:true, value:"Delete",click:deleteItem},
                    { view:"button", id:"btn_clear", autowidth:true, value:"Clear",click: clearForm}
                    ]},
            {cols :[{
                view:"form", id: "user_form",select:true,
                elements:[
                    { view:"text",name:"name",  label:"Name" },
                    { view:"text",name:"username",  label:"Username" },
                    { view:"text",name:"email",  label:"Email" },
                    { view:"text",name:"phone",  label:"phone" },
                    { view:"text",name:"website",  label:"website" },
                ]}, {}]},
            { cols : [
                    //! Сделать фильтр
                    // {}, = спейсер
                    // Размеры width:80 height: 90, autoheight:true,  minWidth:150
                    { view : "datatable" ,columns:[
                            {id:'id',header:"id",width:35},
                            {id:'name',header:"Name",width: 200,fillspace:true},
                            {id:'username',header:"Username",fillspace:true,width: 150},
                            {id:'email',header:"Email",fillspace:true,width:250},
                            {id:'phone',header:"Phone",width:180},
                            {id:'website',header:"Website",width:180},
                        ],css:"webix_data_border webix_header_border", id : "mydatatable" ,scrollX:false,on:{onAfterSelect:valuesToForm}, autoConfig : true , data: grid_data,pager:"pager",}
            ] },{
                view:"pager",
                id:"pager",
                size:7,
                group:3,
                template:"{common.first()}{common.prev()}{common.pages()}{common.next()}{common.last()}"
            },
        ]
    });
});
//Data
let grid_data = fetch('https://jsonplaceholder.typicode.com/users')
    .then(responce => responce.json());
console.log(grid_data);
let tree_data = [
    {   id : "1" ,
        type : "folder",
        value : "Music" ,
        css : "folder_music" }
];

//function

function saveItem(){
    webix.message("'Save' action");
    var grid_data = $$("user_form").getValues();
    $$("mydatatable").add(grid_data);
}
function deleteItem(){
    var list = $$("mydatatable");
    var item_id = list.getSelectedId();
    if (item_id){
        webix.confirm("Delete selected item?", "confirm-warning").then(function(){
            list.remove(item_id);
            webix.message("'Delete' action");
        });
    }
}

function valuesToForm(id){
    var values = $$("mydatatable").getItem(id);
    $$("user_form").setValues(values)
};
function clearForm(){
    $$("user_form").clear();
}
// $$("root").config.height = 400;
// $$("root").resize();
