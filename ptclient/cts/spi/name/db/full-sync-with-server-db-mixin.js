import { NAME_API_URL } from '../const.js'
import ormName from '@/cts/spi/name/db/orm-name.js'
export default {
  methods: {
    async getDataFromDB() {
      // check length and only load if its empty
      // Also need to restrict the load to current patient
      const proNameFromDB = await ormName.api().get(`${NAME_API_URL}/1`)
      if (proNameFromDB.ok) {
      }
    },
  },
}