const ModelVersion = require ('../models/ModelVersionModel');

const getModelVersions = async (req, res) => {
    try{
        const latest = await ModelVersion.findOne().sort({ version: -1}).lean();

        if(!latest){
            return res.status(200).json({
                success:true,
                version: 1,
                updateAvailable: false,
                message: 'No model versions found, defaulting to version 1'
            })
        }

        const currentVersion = parseInt(req.query.version) || 1;
        const updateAvailable = latest.version > currentVersion;

        return res.status(200).json({
            success: true,
            version: latest.version,
            updateAvailable: updateAvailable,
            tfliteUrl: updateAvailable ? latest.tfliteUrl : null,
            vocabUrl: updateAvailable ? latest.vocabUrl : null,
            notes: updateAvailable ? latest.notes : null,
            fileSizeBytes: updateAvailable ? latest.fileSizeBytes : null,
            releasedAt: latest.releasedAt
            
        });
    }catch (error){
        console.error('Error fetching model version:', error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const publishVersion = async (req,res) => {
    try{
        const  { version, tfliteUrl, vocabUrl, notes, fileSizeBytes } = req.body;

        if (!version || !tfliteUrl || !vocabUrl) {
            return res.status(400).json({
                success: false,
                message: 'version, tfliteUrl, vocabUrl are required'
            });
        }

        const existing = await ModelVersion.findOne({ version: -1 });

        if(existing && version <= existing.version){
            return res.status(400).json({
                success: false,
                message: 'Version must be greater than existing version'
            })
        }

        const newVersion = new ModelVersion({
            version,
            tfliteUrl,
            vocabUrl,
            notes,
            fileSizeBytes
        });

        const saved = await newVersion.save();

        return res.status(201).json({
            success: true,
            message: 'Model version published successfully',
            data: saved
        });

    }catch (error){
        
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getModelVersions,
    publishVersion
}