<template>
    <div class="d-inline-flex justify-center flex-wrap">
        <p>{{ start }}</p>
        <div class="guess-container d-flex justify-center">
            <p v-if="guessed && !correct" class="correct-word green--text">
                {{ line.correct }}
            </p>
            <v-text-field
                :class="getTextClass"
                :background-color="color"
                :readonly="guessed"
                :disabled="guessed && !correct"
                hide-details
                v-model="answer"
                @keydown="handleKeydown"
                @blur="guess"
                dense
                solo
                light
            ></v-text-field>
        </div>

        <p>{{ end }}</p>
    </div>
</template>


<script>
import { editDistance } from '~scripts/editDistance';

export default {
    name: 'GuessLine',
    props: {
        line: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            start: '',
            end: '',
            answer: '',
            color: null,
            guessed: false,
            correct: false
        };
    },
    computed: {
        getTextClass() {
            let classes = 'guess-input';
            classes += this.line.start ? ' ml-1' : ' ml-4';
            classes += this.line.end ? ' mr-1' : ' mr-4';
            if (this.guessed && !this.correct) {
                classes += ' text-decoration-line-through';
            }
            return classes;
        }
    },
    methods: {
        handleKeydown(e) {
            if (e.key == 'Enter') {
                this.guess();
            }
        },
        guess() {
            // Don't count empty guess
            if (this.guessed || this.answer.length == 0) return;
            // Case-insensitive edit distance
            let dist = editDistance(this.answer.toUpperCase(), this.line.correct.toUpperCase());
            this.correct = dist < this.line.correct.length * 0.2;
            // If they got it right, then show correct casing
            if (this.correct) this.answer = this.line.correct;
            this.color = this.correct ? 'green' : 'red';
            this.guessed = true;
            this.$emit('guess', this.correct);
        }
    },
    mounted() {
        this.start = this.line.words.slice(0, this.line.guessIndex).join(' ') + ' ' + this.line.start;
        this.end = this.line.end + ' ' + this.line.words.slice(this.line.guessIndex + 1).join(' ');
    }
};
</script>

<style lang="scss">
.v-text-field .v-input__control .v-input__slot {
    min-height: auto !important;
    display: flex !important;
    align-items: center !important;
    width: 100px;
    height: 24px;

    & input {
        padding: 0;
    }
}

.guess-container {
    position: relative;
}

.correct-word {
    position: absolute;
    top: -25px;
}
</style>
