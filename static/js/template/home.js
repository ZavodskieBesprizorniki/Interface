export function home() {
    return{
        animate:true, cells:[{
            id:"home",
            rows:[{
                view:"forminput",
                name:"access",
                labelWidth: 140,
                labelAlign:"right",
                label:"Access levels"
            }
            ]}]
    }
};