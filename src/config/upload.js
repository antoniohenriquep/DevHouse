const multer = require('multer')
const path = require('path')

//Configuracoes do multer
module.exports ={
    storage:multer.diskStorage({
        destination: path.resolve(__dirname,'..','..','uploads'),
        filename:(req,file,cb) =>{
            const extension = path.extname(file.originalname)
            const name = path.basename(file.originalname,extension).split(' ').join('_')

            cb(null,`${name}-${Date.now()}${extension}`)
        },
    })
}
