const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
    try {
        const Categories = await Category.find({});
        res.json({data:Categories});
    } catch (error) {
        res.status(500).json({ message: 'Error getting Categories' });
    }
};



exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findOne({_id:req.params.id});
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error getting Category' });
    }
};




exports.createCategory = async (req, res) => {
    
    try {
        const existingCategory = await Category.findOne({ name: req.body.name });

        if (existingCategory) {
            return res.status(400).json({ message: 'A Category with this name already exists' });
        }
        
        const { name,description } = req.body;
        const newCategory = new Category({ name ,description});

        await Category.create(newCategory);

        res.status(201).json({ message: 'Category created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Category', error });
    }
};


exports.updateCategory = async (req, res) => {
    try {
        // find the Category by its id
        const category = await Category.findById(req.params.id);

        // update the Category's properties with the new data
        category.name = req.body.name;
        category.description = req.body.description;

        // save the updated Category to the database
        const updatedCategory = await category.save();

        // return the updated Category as a response
        res.json(  { message: 'Category updated successfully', updatedCategory });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(500).json({
                message: 'Category not found'
            });
        }
        res.status(200).json({
            message: 'Category deleted successfully'
        });
    } catch (err) {
        return res.status(500).json({
            error: err
        });
    }
};







