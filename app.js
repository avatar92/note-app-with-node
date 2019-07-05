var fs = require('fs')
// var argv=require('yargs').argv
var action = process.argv[2]
var title = process.argv[3]
var titlecontent = process.argv[4]
var body=process.argv[5]
var bodycontent=process.argv[6]
const path = './package.json'
var tab=[]
try {
  if (fs.existsSync(path)) {
    var str=fs.readFileSync('package.json').toString()
    if (str===''){tab=[]}   
    else {tab = JSON.parse(str)}
    
  }
} catch(err) {
  console.error(err)
  tab = []
}
const add=()=>{
    var newtab=tab.concat({title:titlecontent,body:bodycontent})
    var json = JSON.stringify(newtab);
    fs.writeFile('package.json', json, 'utf8',function callback(err){
        if (err) throw err
        console.log('note created','\n'
                    ,'--','\n',
                            '{','title: ',titlecontent,'\n',
                            'body: ',bodycontent,'}')
    });
}
const count =()=> {
     var b=0; 
    for (let i=0;i<tab.length;i++){
        b++
    }
    console.log('Printing',b,'Note')
    for (let j=0;j<tab.length;j++){
        console.log('----------------------------------','\n',
            'title:',tab[j].title,'\n','body: ',tab[j].body)
    }
}
// const Read =(t)=>{                                          //problem ask 
//     let newt=tab.filter(el=>{el.title==t
//     })
//     console.log('this is title',t)
//     console.log('this is package.json tab',tab)
//     console.log(newt)
// }
const removeTitle=(titre='')=> {
    var newtableau=tab.filter(el=>el.title!== titre)
    var json1 = JSON.stringify(newtableau);
    fs.writeFile('package.json', json1, 'utf8',function callback(err){
        if (err) throw err
        console.log('note removed')
    });    
}
const help=()=>{
    console.log('option:'+'\n'+
                        '--help          Show help'+'\n'+
                        '--title, -t     Title of Note'+'\n'+
                        '--body, -b      Body of Note');
}
switch (action){
    case 'list': 
        return count()
    case 'add': 
        if (title===''&&body===''){
            return help()
        } 
        else if (title==='help'||body==='help'){
            return help()
        }
        else if ((title==='--title'||title==='-t')&&(body==='--body'||body==='-b')){
            if (titlecontent&&bodycontent){
                return add()
            }else if (!titlecontent){
                return console.log('Missing title')
            }else if (!bodycontent){
                return console.log('Missing body')
            }
        }
    case 'read': 
        if (!title){ return console.log('option:'+'\n'+
        '--help          Show help'+'\n'+
        '--title, -t     Title of Note')}
        else if(title==='-t'||title==='--title'){
            if (!titlecontent){ return console.log('missing title')}
            else return console.log('---------------------------------------------------------------------------------------------','\n',
                        'title:',tab.filter(el=>el.title===titlecontent)[0].title,'\n','body:',tab.filter(el=>el.title===titlecontent)[0].body)
                    }
    case 'remove': 
        if (!title){ return console.log('option:'+'\n'+
        '--help          Show help'+'\n'+
        '--title, -t     Title of Note')}
        else if(title==='-t'||title==='--title'){
            if (!titlecontent){ return console.log('missing title that u want to remove')}
            else return removeTitle(titlecontent)
        }
    default: 
        return console.log('option:'+'\n'+
        '--help          Show help'+'\n'+
        '--title, -t     Title of Note'+'\n'+
        '--body, -b      Body of Note');
}