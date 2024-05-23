const { PrismaClient } = require('@prisma/client')
const { sqltag } = require('@prisma/client/runtime/library');


// Instacia da classe PrismaClient
const prisma = new PrismaClient()

const selectAllCategoria = async function(){
    try {
        let sql = 'select * from tbl_categoria'
    
       
        let rsCategoria = await prisma.$queryRawUnsafe(sql)
        return rsCategoria
    } catch (error) {
        console.log(error);
        return false
    }
}


const selectCategoriabyID = async function(id){
    try {
        // Realiza a busca do genero pelo ID
        let sql = `select * from tbl_categoria where id_categoria = ${id}`;

        // Executa no banco de dados o script sql
        let rsCategoria = await prisma.$queryRawUnsafe(sql);

            return rsCategoria;
    
        } catch (error) {
            console.log(error);
            return false;
            
        }
        
}

const insertCategoria = async function(dadosCategoria) {
    try {
        let sql;

         sql = ` INSERT INTO tbl_categoria (
                            nome
                        ) 
         VALUES 
           ('${dadosCategoria.nome}')`; 

        let result = await prisma.$executeRawUnsafe(sql);
        
        if (result)
            return true;
        else
            return false;

        } catch (error) {
            console.log(error);
            return false;
        }

}

const lastIDCategoria = async function(){
    try {
        let sql = `SELECT id_categoria FROM tbl_categoria ORDER BY id_categoria DESC LIMIT 1;`

        let sqlID = await prisma.$queryRawUnsafe(sql)

        return sqlID
    } catch (error) {
        return false
    }
    
}

const deleteCategoria = async(id) =>{
    try{

        let sql = `delete from tbl_categoria where id_categoria = ${id}`
       
    
        //Executa o sql no banco de dados
        let rsdeleteCategoria = await prisma.$executeRawUnsafe(sql)

    
       return rsdeleteCategoria
    
        } catch(error){
            return false
        }
}


module.exports ={
    selectAllCategoria,
    selectCategoriabyID,
    insertCategoria,
    lastIDCategoria,
    deleteCategoria

}