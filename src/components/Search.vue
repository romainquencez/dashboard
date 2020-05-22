<template>
  <div>
    <form @submit.prevent="onSubmit">
      <b-input
        v-model="query"
        ref="input"
        size="is-large"
        :loading="isLoading"
        :class="{'is-dark': isDark}"
      ></b-input>
    </form>
    <div
      v-if="results.length"
      class="results"
      :class="{
        'is-dark has-background-black-ter': isDark,
        'is-light has-background-white': !isDark
      }"
    >
      <result
        v-for="(result, index) in results"
        :key="index"
        :result="result"
        :is-dark="isDark"
      ></result>
    </div>
  </div>
</template>

<script>
import Result from '@/components/Result'
import ACTIONS from '@/assets/actions.js'

export default {
  name: 'Search',
  components: { Result },
  props: {
    isDark: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      query: ''
    }
  },
  mounted () {
    // give focus to search input
    this.$refs.input.focus()
  },
  computed: {
    isCommand () {
      // do query starts with chevron ?
      return this.query.length > 0 && this.query[0] == '>'
    },
    command () {
      // query without chevron, if its a command
      return this.isCommand ? this.query.substring(1) : null
    },
    firstSpace () {
      // first space character in query
      return this.query.indexOf(' ')
    },
    shortcut () {
      // return command until first space (if present)
      if (this.isCommand) {
        if (this.firstSpace == -1) {
          return this.command || null
        }
        return this.command.substring(0, this.firstSpace - 1) || null
      }
      return null
    },
    keyword () {
      // return keyword after shortcut + space in command
      if (this.isCommand && this.firstSpace != -1) {
        return this.command.substring(this.firstSpace) || null
      }
      return null
    },
    action () {
      // return found action with formatted name and url
      let action
      if (this.shortcut) {
        action = ACTIONS.find(action => action.shortcut == this.shortcut)
        action = { ...action }
        // format name and url if keyword exist
        if (this.keyword) {
          action.name = `${action.name} "${this.keyword}"`
          action.url = action.search.replace('%s', this.keyword)
        } else {
          action.url = action.homepage
        }
        return action
      }
      // no shortcut, regular search
      action = ACTIONS.find(action => action.default)
      action = { ...action }
      action.url = action.search.replace('%s', this.query)
      return action
    },
    results () {
      if (this.query.length) {
        if (this.isCommand) {
          if (this.command.length && this.action) {
            return [this.action]
          } else {
            // show all available actions
            let results = []
            let actions = ACTIONS
            actions.sort((a, b) => {
              return a.name.localeCompare(b.name)
            }).forEach(action => {
              results.push({
                url: `>${action.shortcut}`,
                name: action.name,
                icon: action.icon
              })
            })
            return results
          }
        }
        // search
        return [{
          name: `Recherche "${this.query}"`,
          url: this.action.url
        }]
      }
      return []
    }
  },
  methods: {
    onSubmit () {
      window.location.href = this.action.url
    }
  }
}
</script>

<style>
.results {
  border-width: 1px;
  border-style: solid;
  border-top: none;
  border-radius: 0 0  4px 4px;
  max-height: 75vh;
  overflow: auto;
}
.results.is-light {
  border-color: rgb(219, 219, 219);
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
}
.results.is-dark {
  border-color: rgb(19, 19, 19);
  box-shadow: inset 0 1px 2px rgba(210, 210, 210, 0.1);
}
.result {
  padding: .5rem 0;
  border-bottom-width: 1px;
  border-bottom-style: solid; ;
}
.is-light .result {
  border-bottom-color: #eee;
}
.is-dark .result {
  border-bottom-color: #333;
}

/* search input */
.is-dark .input {
  background: rgb(36, 36, 36);
  color: whitesmoke;
  border-color: #333;
}
</style>
