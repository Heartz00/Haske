import store from "../store"
import api from "../orthancApi"

export default {
    getResourceTitle(resourceType, patientMainDicomTags, studyMainDicomTags, seriesMainDicomTags, instanceTags) {
        let title = [];

        function addIfExists(title, key, dico) {
            if (key in dico) {
                title.push(dico[key]);
                return true;
            }
            return false;
        };

        if (resourceType == "study" || resourceType == "series") {
            addIfExists(title, "PatientID", patientMainDicomTags)
            addIfExists(title, "StudyID", studyMainDicomTags)
            addIfExists(title, "StudyDate", studyMainDicomTags)
            addIfExists(title, "StudyDescription", studyMainDicomTags)
        }
        if (resourceType == "series" || resourceType == "instance") {
            addIfExists(title, "SeriesNumber", seriesMainDicomTags);
            addIfExists(title, "SeriesDescription", seriesMainDicomTags);
        }
        if (resourceType == "instance") {
            if ("0020,0013" in instanceTags) {
                title.push("instance # " + instanceTags["0020,0013"]["Value"]);
            } else {
                title.push("instance");
            }
        }

        return title.join(" | ");
    },

    patientNameCapture : "([^\\^]+)\\^?([^\\^]+)?\\^?([^\\^]+)?\\^?([^\\^]+)?\\^?([^\\^]+)?",
    patientNameFormatting : null,
    formatPatientName(originalPatientName) {
        if (originalPatientName && this.patientNameFormatting && this.patientNameCapture) {
            return originalPatientName.replace(new RegExp(this.patientNameCapture), this.patientNameFormatting);
        } else {
            return originalPatientName;
        }
    },

    getPrimaryViewerUrl(level, orthancId, dicomId) {
        if (store.state.configuration.uiOptions.ViewersOrdering.length > 0) {
            return this.getViewerUrl(level, orthancId, dicomId, store.state.configuration.uiOptions.ViewersOrdering[0]);
        }
        return null;
    },

    getViewerUrl(level, orthancId, dicomId, viewer) {
        if (viewer == 'osimis-web-viewer') {
            return api.getOsimisViewerUrl(level, orthancId);
        } else if (viewer == 'stone-webviewer') {
            return api.getStoneViewerUrl(level, dicomId)
        } else if (viewer == 'volview') {
            return api.getVolViewUrl(level, orthancId);
        } else if (viewer == 'ohif') {
            if (store.state.configuration.ohifDataSource == 'dicom-web') {
                return api.getOhifViewerUrlForDicomWeb('basic', dicomId);
            } else {
                return api.getOhifViewerUrlForDicomJson('basic', dicomId);
            }
        } else if (viewer == 'ohif-vr') {
            return api.getOhifViewerUrl('vr');
        } else if (viewer == 'ohif-tmtv') {
            return api.getOhifViewerUrl('tmtv');
        } else if (viewer == 'ohif-seg') {
            return api.getOhifViewerUrl('seg');
        } else if (viewer == 'ohif-micro') {
            return api.getOhifViewerUrl('microscopy');
        } else if (viewer == 'wsi') {
            return api.getWsiViewerUrl(orthancId); // note: this must be a series ID !
        } else if (viewer == 'meddream') {
            return store.state.configuration.uiOptions.MedDreamViewerPublicRoot + "?study=" + dicomId;
        }
    }
}
