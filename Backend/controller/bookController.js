const BookModel = require('../model/bookModel')

const postController = async(req,res) =>{
    try{
        const { name, author, imageURL } = req.body
        const newBook = new BookModel({
            name: name,
            author: author,
            imageURL: imageURL
        })
        await newBook.save()
        return res.status(200).json({message: "Book Added"})
    }
    catch(err){
        console.log(`Error in Add Book Controller - ${err}`)
        return res.status(200).json({message: "Internal Server Error"})
    }
}

const getController = async(req,res) =>{
    try{
        const books = await BookModel.find()
        return res.status(200).json(books)
    }
    catch(err){
        console.log(`Error in Get Book Controller - ${err}`)
        return res.status(200).json({message: "Internal Server Error"})
    }
}

const deleteController = async(req,res) =>{
    try{
        const { id } = req.params
        await BookModel.findByIdAndDelete(id)
        return res.status(200).json({message: "Deleted Successfully"})
    }
    catch(err){
        console.log(`Error in Delete Book Controller - ${err}`)
        return res.status(200).json({message: "Internal Server Error"})
    }
}

const editController = async(req,res) =>{
    try{
        const { id } = req.params
        const { name, author, imageURL } = req.body
        const updatedBook = await BookModel.findByIdAndUpdate(id, {name: name, author: author, imageURL: imageURL}, {new: true})
        if(!updatedBook){
            return res.status(200).json({message: "Book Not Found"})
        }
        else{
            return res.status(200).json({message: "Book Updated"})
        }
    }
    catch(err){
        console.log(`Error in Edit Book Controller - ${err}`)
        return res.status(200).json({message: "Internal Server Error"})
    }
}

const getSingleBookController = async(req,res) =>{
    try{
        const { id } = req.params
        const book = await BookModel.findById(id)
        return res.status(200).json(book)
    }
    catch(err){
        console.log(`Error in Get Single Book Controller - ${err}`)
        return res.status(200).json({message: "Internal Server Error"})
    }
}

module.exports = { postController, getController, deleteController, editController, getSingleBookController }