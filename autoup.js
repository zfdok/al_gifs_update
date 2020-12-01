var fs = require('fs')
var request = require("request");

fs.readFile('./imgs.txt', { encoding: 'utf-8' }, (err, data) => {
  let srcs = []
  srcs = data.split('\r\n');
  convert_datas(srcs)
})

let convert_datas = (srcs) => {
  fs.readdir('./src', (err, files) => {
    let datas = []
    files.forEach(file => {
      let data = {}
      data.code = file.split('.')[0].split('$')[0]
      data.desc = file.split('.')[0].split('$')[1]
      srcs.forEach(src => {
        if (src.split('/').pop().split('.')[0] == data.code) {
          data.src = src
        }
      })
      if (data.src == undefined) {
        throw err
      }
      datas.push(data)
    });
    console.log(datas);
    upload_datas(datas);
  })
}


let upload_datas = (datas) => {
  console.log(datas);
  request({
    url: "http://gifcheshen.com:3000/sql/set_an_artical", method: 'GET', timeout: 5000, qs: {
      name: datas[0].desc,
      i1_img: datas[0].src,
      i1_desc: datas[0].desc,
      i1_code: datas[0].code,
      i2_img: datas[1].src,
      i2_desc: datas[1].desc,
      i2_code: datas[1].code,
      i3_img: datas[2].src,
      i3_desc: datas[2].desc,
      i3_code: datas[2].code,
      i4_img: datas[3].src,
      i4_desc: datas[3].desc,
      i4_code: datas[3].code,
      i5_img: datas[4].src,
      i5_desc: datas[4].desc,
      i5_code: datas[4].code,
    }
  }, function (error, res, body) {
    console.log(res.body);
  })
}
