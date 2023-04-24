const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')


async function load(){
    const res = await fetch("http://localhost:3000/").then((data)=> data.json());
    res.urls.map(url => addElement(url));
}

load();

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"
    a.id = url

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

async function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?')){
        const urlDelete =  el.parentNode.childNodes[0].id;
        const nameDelete =  el.parentNode.childNodes[0].text;

        const res = await fetch(`http://localhost:3000/?name=${nameDelete}&url=${urlDelete}&del=1`).then((data)=> data.json());

        if(res.message == "Ok") return el.parentNode.remove()    


    }
    
    return
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    
    const res = fetch(`http://localhost:3000/?name=${name}&url=${url}`).then((data)=> data.json());

    if(res.message == "Ok") {
         location.reload();
    }
})