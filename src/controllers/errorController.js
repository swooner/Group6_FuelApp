exports.getErrorPage = (req, res, nex) => {
    res.render('error', {
        title: 'Error',
        statusCode: 400,
        message: 'The Page Resquested Does NOT Exist',
    })
}