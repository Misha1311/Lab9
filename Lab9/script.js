const $list = document.querySelector(".list");
const $queryField = document.querySelector(".query");
const $lister = document.querySelector(".lister");

let arr = ['Человек паук', 'Железный человек', 'Халк', 'Тор', 'Капитан Америка'];

function templateGenerator(list){
    if(!list.length)
    {
        $list.innerHTML = '<li>Not Found</li>';
    }
    else
    {
        let template = '';
        for(let i = 0; i < list.length; i++)
        {
            template += '<li>' + list[i] + '</li>';
        }
        $list.innerHTML = template;
    }
}

$queryField.addEventListener('input', function(){
    let query = this.value.toLowerCase(); 
    if(query == 0){
        $lister.style.visibility='hidden';
    }else{
        $lister.style.visibility='visible';
    }   
    let buffer = arr.filter(function(el){
        if(el.toLowerCase().indexOf(query) != -1)
        {
            return true;
        }
        else 
        {
            return false;
        }
    });
    templateGenerator(buffer);
});