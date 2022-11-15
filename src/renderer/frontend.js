import os from 'os'
import url from 'url'
import path from 'path'
import applyFilter from './filters'

window.addEventListener('load', () => {
  addImagesEvents()
  searchImagesEvent()
  selectEvent()
  downloadEvent()
})

function addImagesEvents(){
  const thumbs = document.querySelectorAll('li.list-group-item')

  for(let i = 0, length1 = thumbs.length; i < length1; i++){
    thumbs[i].addEventListener('click', function(){
      changeImage(this)
    })
  }
}

function changeImage(node){
  if (node){

    document.querySelector('li.selected').classList.remove('selected')
    node.classList.add('selected')
    document.getElementById('image-displayed').src = node.querySelector('img').src
  }else{
    document.getElementById('image-displayed').src = ''
  }

}

function searchImagesEvent(){

  const searchbox = document.getElementById('search-box')

  searchbox.addEventListener('keyup', function(){
    const regex = new RegExp(this.value.toLowerCase(), 'gi')

    if (this.value.length > 0){
      const thumbs = document.querySelectorAll('li.list-group-item img')
      for(let i = 0, length1 = thumbs.length; i < length1; i++){
        const fileUrl = url.parse(thumbs[i].src)
        const fileName = path.basename(fileUrl.pathname)
        if(fileName.match(regex)){
          thumbs[i].parentNode.classList.remove('hidden')
        }else{
          thumbs[i].parentNode.classList.add('hidden')
        }
      }

      selectFirstImage()
    }else{
      const hidden = document.querySelectorAll('li.hidden')
      for(let i = 0, length1 = hidden.length; i < length1; i++){
        hidden[i].classList.remove('hidden')
      }
    }
  })
}

function selectFirstImage(){
  const image = document.querySelector('li.list-group-item:not(.hidden)')
  changeImage(image)
}

function selectEvent(){
  const select = document.getElementById('filters')

  select.addEventListener('change', function(){
    if(select.value == 'normal'){
      changeImage(document.querySelector('li.list-group-item.selected'))
    }else{
      applyFilter(this.value, document.getElementById('image-displayed'))
    }
    
  })
}

function downloadEvent(){
  const image = document.getElementById('image-displayed')

  const btnDescargar = document.getElementById('download-image')

  btnDescargar.addEventListener('click', function(){

    var a = document.createElement('a')

    a.download = image.src.split('/').pop()
    a.target = '_blank'
    a.href = image.src

    a.click()
  })


}