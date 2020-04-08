import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleLeft,
  faAngleRight,
  faAngleUp,
  faCircle,
  faCode,
  faCoffee,
  faCog,
  faEye,
  faShoppingBag,
  faSortDown,
  faSortUp,
  faUsers,
  faWallet,
  faTrash,
  faInfoCircle,
  faLongArrowAltRight,
  faTimes,
  faTimesCircle,
  faEdit,
  faLink,
  faFileImport,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
<<<<<<< Updated upstream
=======
  faSortUp,
  faFileAlt,
  faCloudUploadAlt,
  faCheckCircle,
  faFileSignature,
  faFile,
  faFileUpload,
  faFileDownload,
>>>>>>> Stashed changes
  faFileImport,
  faCoffee,
  faWallet,
  faEye,
  faCode,
  faShoppingBag,
  faUsers,
  faCog,
  faAngleRight,
  faAngleLeft,
  faCircle,
  faSortDown,
  faAngleUp,
  faTrash,
  faInfoCircle,
  faLongArrowAltRight,
  faTimes,
  faTimesCircle,
  faEdit,
  faLink
)
Vue.component('font-awesome-icon', FontAwesomeIcon)
