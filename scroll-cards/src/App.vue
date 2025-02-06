<script setup lang="ts">
import Card from './Card.vue'
import { ref, onMounted } from 'vue'

const cards = Array.from(Array(100), (_, x) => `Card ${x + 1}`)
const focusedCardId = ref<number | null>(null)
const lastScrollY = ref(0)

const checkCardVisibility = () => {
  const cardElements = document.querySelectorAll('.card')
  const visibleCards: number[] = []

  cardElements.forEach((card, index) => {
    const rect = card.getBoundingClientRect()
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight
    if (isVisible) {
      visibleCards.push(index)
    }
  })

  if (visibleCards.length === 0) return

  // Determine scroll direction
  const scrollDirection = lastScrollY.value < window.scrollY ? 'down' : 'up'
  lastScrollY.value = window.scrollY

  // Set focus based on scroll direction or initial load
  if (focusedCardId.value === null) {
    // Initial load - focus topmost visible card
    focusedCardId.value = Math.min(...visibleCards)
  } else {
    // During scroll - focus based on direction
    focusedCardId.value =
      scrollDirection === 'down' ? Math.min(...visibleCards) : Math.max(...visibleCards)
  }
}

onMounted(() => {
  // Immediate initial check for visible cards
  checkCardVisibility()

  // Add scroll event listener
  window.addEventListener('scroll', checkCardVisibility)
})
</script>

<template>
  <div>
    <Card
      v-for="(card, id) in cards"
      :cardText="card"
      :key="id"
      :isInFocus="focusedCardId === id"
      class="card"
    >
      <p>{{ card }}</p>
    </Card>
  </div>
</template>

<style scoped>
.card {
  margin: 10px;
  padding: 20px;
}
</style>
