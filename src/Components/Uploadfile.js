import React, { useState } from 'react'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
let Uploadfile = () => {

    let pond = {} ;
    let [state, setState] = useState({
        files: [{
            source: 'index.html',
            options: {
                type: 'local'
            }
        }]
    })
    
    let handleInit = () => {
        console.log('FilePond instance has initialised', pond);
    }

    return (
        <div className="App">
        
            {/* Pass FilePond properties as attributes */}
            <FilePond ref={ref => pond = ref}
                        files={state.files}
                        allowMultiple={true}
                        maxFiles={3}
                    //   server="/api"
                        oninit={() => handleInit() }
                        onupdatefiles={(fileItems) => {
                            // Set current file objects to state
                            setState({
                                files: fileItems.map(fileItem => fileItem.file)
                            });
                        }}>
            </FilePond>

        </div>
    );
    
}

export default Uploadfile