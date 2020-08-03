// Ref: https://stackoverflow.com/questions/43841778/vue-js-how-to-use-in-mixins-in-single-file-template
import ormRem from '~/cts/spi/1t-Mr1f/rem/db/vuex-orm/rem.js'

export default {
  methods: {
    mxOpenACtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'add reminder',
      })
    },
    mxOpenMCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'multi change reminder',
      })
    },
    mxOpenDDialog() {
      let confirmMessage = 'Are you sure you want to discontinue all the selected reminders?'
      if (this.daSelectedRemForDiscontinue.length === 0) {
        confirmMessage = 'No reminder selected. Please select at least one reminder.'
      }

      this.$confirm(confirmMessage, 'Multi discontinue', {
        confirmButtonText: 'Discontinue',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(async () => {
          if (this.daSelectedRemForDiscontinue.length > 0) {
            const status = await ormRem.sendMultiDiscontinueDataToServer(
              this.daSelectedRemForDiscontinue
            )
            if (status.success > 0) {
              this.$message({
                type: 'success',
                message: status.success + ' reminder discontinued.',
              })
            }
            if (status.failed > 0) {
              this.$message({
                type: 'error',
                message: status.failed + ' reminder failed to discontinue. Please try again later.',
              })
            }
          }
          console.log('daSelectedRemForDiscontinue=====>', this.daSelectedRemForDiscontinue)
        })
        .catch(() => {
          console.log('multi discontinue cancelled')
        })
    },
    mxOpenXCtInCl() {
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', {
        searchTerm: 'discontinued reminders',
      })
    },
    mxOpenCCtInCl(pORMDataRowID) {
      /*
       We need rowID of vuexORM inside the change ct. Since change ct needs the exiting Desc of the reminber to change
       Option 1: Send the whole data row
       Option 2: Send just the ID in a prop.
        +ves:
          1. At some places I may need to call change where I have the reminder ID but
          i do not have the remainder of the data row. Hence this makes the Change Ct possible
          to use at other places
          2. When I send a paramter it is like calling a function. Sending the whole data row
          is like working on a gloal variable. So other Cts can also modify this global variable.
      */
      const payload = { searchTerm: 'change reminder', pPropsToGiveToCt: pORMDataRowID }
      this.$store.commit('mtfShowNewFirstTabInClFromSearchPhrase', payload)
    },
    mxOpenDPrompt(pORMDataRowID) {
      const arResultsFromORM = ormRem.find(pORMDataRowID)

      this.$prompt(arResultsFromORM.remDesc, 'Discontinue reminder', {
        confirmButtonText: 'Discontinue',
        cancelButtonText: 'Cancel',
        inputPlaceholder: 'Enter discontinue note',
      })
        .then(async ({ value }) => {
          const status = await ormRem.sendDiscontinueDataToServer(
            pORMDataRowID,
            arResultsFromORM.uuid,
            value
          )
          if (status === 1) {
            this.$message({
              type: 'success',
              message: 'Reminder discontinued.',
            })
          } else {
            this.$message({
              type: 'error',
              message: 'Something went wrong. Please try again later.',
            })
          }
          console.log('discontinue status ======> ', status)
        })
        .catch(() => {
          console.log('Discontinue cancelled')
        })
    },
    mxHandleSelectionForDiscontinue(val) {
      this.daSelectedRemForDiscontinue = val
    },
  },
}