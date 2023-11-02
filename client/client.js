const form=document.querySelector('form');
const tweetdiv = document.querySelector(".tweets");
const API_URL = "http://localhost:3000/tweets";

function listAllTweet(){
    tweetdiv.innerHTML="";
    fetch(API_URL)//default olarak get isteği yapar
    .then(res=>res.json())
    .then(twits=>{
        twits.forEach(twit => {
            const div=document.createElement('div');
            const header=document.createElement('h3');
            header.textContent=twit.name;
            const contents=document.createElement('p');
            contents.textContent=twit.content;

            const date=document.createElement('small');
            date.textContent= twit.created;

            div.appendChild(header);
            div.appendChild(contents);
            div.appendChild(date);

            tweetdiv.appendChild(div);
            
        });
    })
}

listAllTweet();


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const formdata=new FormData(form);
    //isim ve content alcaz
    const name=formdata.get("name");
    const content=formdata.get("content");

    const tweet={
        name,
        content
    }
    console.log(tweet); //serverda yazdırmak yerine formdan alınan name ve content bilgileri hedef API_URL'İNE gönderilcek

    fetch(API_URL,{
        method:"POST",
        body:JSON.stringify(tweet),
        header:{'content-type':'application/json'}

    }).then((res)=>res.json())
    // .then(()=>{
    //     form.reset();//json formatında bilgier gonderilince formu resetle
    // })





    
})