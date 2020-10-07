
/**
 * Tools.js
 * 
 */
(function() {

    /**
     * Properties
     * 
     */

    /**
     * __uppy
     * 
     * @access  private
     * @var     null|Uppy (default: null)
     */
    var __uppy = null;

    /**
     * Methods
     * 
     */

    /**
     * __addUppyCompleteEventListener
     * 
     * @access  private
     * @return  void
     */
    function __addUppyCompleteEventListener() {
        var eventName = 'complete',
            callback = __handleUppyCompleteEventListener;
        __uppy.on(eventName, callback);
    }

    /**
     * __addUppyUploadSuccessEventListener
     * 
     * @access  private
     * @return  void
     */
    function __addUppyUploadSuccessEventListener() {
        var eventName = 'upload-success',
            callback = __handleUppySuccessEventListener;
        __uppy.on(eventName, callback);
    }

    /**
     * __createUppyReference
     * 
     * @access  private
     * @return  void
     */
    function __createUppyReference() {
        var uppy = Uppy.Core({autoProceed: true});
        uppy.use(Uppy.DragDrop, { target: '.UppyDragDrop' });
        uppy.use(Uppy.Tus, { endpoint: '//master.tus.io/files/' });
        __uppy = uppy;
    }

    /**
     * __getCloudinaryTrimURL
     * 
     * @access  private
     * @param   String url
     * @return  String
     */
    function __getCloudinaryTrimURL(url) {
        var host = 'res.cloudinary.com',
            path = '/demo/image/fetch/e_trim/' + (url),
            url = 'https://' + (host) + (path);
        return url;
    }

    /**
     * __getDownloadURL
     * 
     * @access  private
     * @param   Array packages
     * @return  String
     */
    function __getDownloadURL(packages) {
        var data = {};
        data.data = {};
        data.data.files = packages;
        var url = 'https://dev.getstencil.com/utils/download',
            queryString = jQuery.param(data);
        url = (url) + '?' + (queryString);
        return url;
    }

    /**
     * __handleUppyCompleteEventListener
     * 
     * @access  private
     * @param   Object response
     * @return  void
     */
    function __handleUppyCompleteEventListener(response) {

        // Parsing
        var files = response.successful;
        if (files.length > 0) {
            var packages = [];
            for (var index in files) {
                index = parseInt(index, 10);
                var file = files[index],
                    package = {};
                package.fileroot = 'stencil-' + (index + 1);
                // package.url = file.uploadURL;
                package.url = __getCloudinaryTrimURL(file.uploadURL);
                packages.push(package);
            }
        }

        // Download URL
        __setDownloadURL(packages);
    }

    /**
     * __handleUppySuccessEventListener
     * 
     * @access  private
     * @param   File file
     * @param   Object response
     * @return  void
     */
    function __handleUppySuccessEventListener(file, response) {
    }

    /**
     * __setDownloadURL
     * 
     * @access  private
     * @param   Array packages
     * @return  void
     */
    function __setDownloadURL(packages) {
        var url = __getDownloadURL(packages);
        $('#button').attr('href', url);
    }

    /**
     * __setupUppy
     * 
     * @access  private
     * @return  void
     */
    function __setupUppy() {
        __createUppyReference();
        __addUppyCompleteEventListener();
        __addUppyUploadSuccessEventListener();
    }

    // Setup
    __setupUppy();
    return true;
})();
