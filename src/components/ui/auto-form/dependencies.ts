import { createContext } from 'reka-ui'
import { useFieldValue, useFormValues } from 'vee-validate'
import type { Ref } from 'vue'
import { computed, ref, watch } from 'vue'
import { type Dependency, DependencyType, type EnumValues } from './interface'
import { getFromPath, getIndexIfArray } from './utils'

export const [injectDependencies, provideDependencies] = createContext<Ref<Dependency<any>[] | undefined>>('AutoFormDependencies')

export default function useDependencies(
  fieldName: string,
) {
  const form = useFormValues()
  // parsed test[0].age => test.age
  const currentFieldName = fieldName.replace(/\[\d+\]/g, '')
  const currentFieldValue = useFieldValue<any>(fieldName)

  if (!form)
    throw new Error('useDependencies should be used within <AutoForm>')

  const dependencies = injectDependencies()
  const isDisabled = ref(false)
  const isHidden = ref(false)
  const isRequired = ref(false)
  const overrideOptions = ref<EnumValues | undefined>()

  const currentFieldDependencies = computed(() => dependencies.value?.filter(
    dependency => dependency.targetField === currentFieldName,
  ))

  function getSourceValue(dep: Dependency<any>) {
    const source = dep.sourceField as string
    const index = getIndexIfArray(fieldName) ?? -1
    const partsSource = source.split('.')
    const [sourceLast, ...sourceInitial] = [partsSource[partsSource.length - 1], ...partsSource.slice(0, -1).reverse()]
    const targetParts = (dep.targetField as string).split('.')
    const [_targetLast, ...targetInitial] = [targetParts[targetParts.length - 1], ...targetParts.slice(0, -1).reverse()]

    if (index >= 0 && sourceInitial.join(',') === targetInitial.join(',')) {
      const currentParts = fieldName.split('.')
      const [_currentLast, ...currentInitial] = [currentParts[currentParts.length - 1], ...currentParts.slice(0, -1).reverse()]
      return getFromPath(form.value, currentInitial.join('.') + sourceLast)
    }

    return getFromPath(form.value, source)
  }

  const sourceFieldValues = computed(() => currentFieldDependencies.value?.map(dep => getSourceValue(dep)))

  const resetConditionState = () => {
    isDisabled.value = false
    isHidden.value = false
    isRequired.value = false
    overrideOptions.value = undefined
  }

  watch([sourceFieldValues, dependencies], () => {
    resetConditionState()
    currentFieldDependencies.value?.forEach((dep) => {
      const sourceValue = getSourceValue(dep)
      const conditionMet = dep.when(sourceValue, currentFieldValue.value)

      switch (dep.type) {
        case DependencyType.DISABLES:
          if (conditionMet)
            isDisabled.value = true

          break
        case DependencyType.REQUIRES:
          if (conditionMet)
            isRequired.value = true

          break
        case DependencyType.HIDES:
          if (conditionMet)
            isHidden.value = true

          break
        case DependencyType.SETS_OPTIONS:
          if (conditionMet)
            overrideOptions.value = dep.options

          break
      }
    })
  }, { immediate: true, deep: true })

  return {
    isDisabled,
    isHidden,
    isRequired,
    overrideOptions,
  }
}
