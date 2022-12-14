var socket = io.connect('34.94.174.46:5001',{'forceNew':true});

const WHITE_KEYS = ['a', 's', 'd', 'f', 'g', 'h', 'j']
const BLACK_KEYS = ['w', 'e', 't', 'y', 'u']

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')
const canal = document.getElementById('canal')

var recibir = document.getElementById('recibir');
var channel = 0
canal.innerHTML = `<h3>Channel ${channel}</h3>`

keys.forEach(key => {
  key.addEventListener('click', () => {
    socket.emit('note', `${channel},${key.dataset.note}`)
    if(!recibir.checked) playNote(key.dataset.note)
  })
})

document.addEventListener('keydown', e => {
  if (e.repeat) return
  const key = e.key
  const whiteKeyIndex = WHITE_KEYS.indexOf(key)
  const blackKeyIndex = BLACK_KEYS.indexOf(key)

  if (whiteKeyIndex > -1) {
    socket.emit('note', `${channel},${whiteKeys[whiteKeyIndex].dataset.note}`)
    if(!recibir.checked) playNote(whiteKeys[whiteKeyIndex].dataset.note)
  }
  if (blackKeyIndex > -1) {
    socket.emit('note', `${channel},${blackKeys[blackKeyIndex].dataset.note}`)
    if(!recibir.checked) playNote(blackKeys[blackKeyIndex].dataset.note)
  }
})

socket.on('desde_servidor', function(note){
  var channel_note = note.toString().split(',',2)
  if(recibir.checked) if(channel==channel_note[0]) playNote(channel_note[1])
})

function playNote(note) {
  const noteAudio = document.getElementById(note)
  noteAudio.currentTime = 0
  noteAudio.play()
  const key = document.querySelector(`[data-note="${note}"]`)
  key.classList.add('active')
  noteAudio.addEventListener('ended', () => {
    key.classList.remove('active')
  })
}

function channelSelector(lim,mode) {
  if(mode && channel<lim) channel = channel+1
  if (!mode && channel>lim) channel = channel-1
  canal.innerHTML = `<h3>Channel ${channel}</h3>`
}