'use strict'
//Data

let grid_data = fetch('https://jsonplaceholder.typicode.com/users')
    .then(responce => responce.json());
const base = {
    event: "save",
    to_save: {
        fname: "Olesya",
        lname: "Hueva",
        date_burn: "22.02.1999",
        secret_level: 3,
        password: "password",
    }
};
// 
webix.ready(function () {
    webix.ui({
        type:"line",
        container: "app",// #app => div
        id: "root",// можем обращатся через $$  
        height:1000,
        rows:[
            //! HEADER
            {view:"toolbar",
            cols:[
                { view:"label", label:"logo"},
                {view:"tabbar",css:"webix_transparent", multiview:true, value:"data", options:[
                        { id:"home", value:"Home" },
                        { id:"data", value:"Data" },
                        { id:"settings", value:"Settings" }
                    ]},
                {},
                {height: 40, type:"icon", icon:"wxi-user",  view:"button", label:"Profile", width:100, css:"webix_transparent", click:function (){
                    alert('hello')
                }}
            ]},
            //!MAIN
            {animate:true, cells:[{
                id:'data',
                cols:[
                { view: "list",
                id:"mylist",
                scroll:false,
                select:true,
                width:200,
                css:"list_color",
                data:[
                    {value:"Users"},
                    {value:"Level"},
                    {value:"Location"}
                ]},
                {view: "resizer"},
                { rows:[
                    //! Сделать фильтр
                    { view : "datatable" ,minHeight:500,minWidth:1000,columns:[
                            {id:'id',header:"id",width:35},
                            {id:'name',header:"Name",width: 200,fillspace:true, sort:"string"},
                            {id:'username',header:"Username",fillspace:true,sort:"string",width: 150},
                            {id:'email',header:"Email",fillspace:true,width:250},
                            {id:'phone',header:"Phone",width:180},
                            {id:'website',header:"Website",width:180},
                            ],css:"webix_data_border webix_header_border", id : "mydatatable" ,scrollX:false,on:{onAfterSelect:valuesToForm},select:true, autoConfig : true , data: grid_data,pager:"pager"
                    },
                    { view:"pager",
                        id:"pager",
                        size:13,
                        group:3,
                        template:"{common.first()}{common.prev()}{common.pages()}{common.next()}{common.last()}"
                    }
                    ] },
                {view: "resizer"},
                
                {view:"form", id: "user_form",select:true,elements:[
                    { template:"User", type:"section"},
                    { view:"text",name:"name",  label:"Name" },
                    { view:"text",name:"username",  label:"Username" },
                    { view:"text",name:"email",  label:"Email" },
                    { view:"text",name:"phone",  label:"phone" },
                    { view:"text",name:"website",  label:"website" },
                    {cols:[
                        { view:"button", id:"btn_save", autowidth:true, value:"Save",click:saveItem},
                        { view:"button", id:"btn_del", autowidth:true, value:"Delete",click:deleteItem},
                        { view:"button", id:"btn_clear", autowidth:true, value:"Clear",click: clearForm}
                    ]},
                ]}
            ]},
            {
                id:"settings", view:"form",
                rows:[
                  { template:"Settings", type:"section"},
                  { view:"label", label:"Choose the language" },
                  {
                    view:"segmented", inputWidth:200, options:[
                      { id:"ru", value:"Russia" },
                      { id:"en", value:"English" }
                    ], on:{
                      onChange(value, old){
                        webix.message("Option: " + value);
                      }
                    }
                  },
                  {}
                ]
              },{
                view:"calendar",
                id:"home",
                date:new Date(2012,3,16),
                weekHeader:true,
                events:webix.Date.isHoliday,
                width:300,
                height:250
            }]},

            //! FOOTER
            {template:"Footer"}
        ]
    });
});



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
