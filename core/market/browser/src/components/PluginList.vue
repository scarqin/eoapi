<template>
  <div class="border-b px-4 py-4">
    <a-input v-model:value="search" placeholder="搜索关键字" class="w-60">
      <template #prefix>
        <search-outlined type="user" />
      </template>
    </a-input>
  </div>
  <div class="list-block grid grid-cols-4">
    <div
      class="
        min-w-1/2
        max-w-11/12
        h-60
        p-4
        m-4
        border
        rounded-lg
        flex
        items-center
        justify-self-center
        flex-col flex-wrap
        plugin-block
      "
      v-for="(it, index) in renderList"
      :key="index"
      @click="handleClick(it)"
    >
      <i
        class="block w-20 h-20 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${require('../assets/logo.png')})` }"
      ></i>
      <span>{{ it.name }}</span>
      <span>{{ it.author }}</span>
      <div class="desc">{{ it.description }}</div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { SearchOutlined } from '@ant-design/icons-vue';
import { getList } from '../http';

let search = ref('');
const renderList = ref([]);
const router = useRouter();
const route = useRoute();

const handleClick = ({ name }) => {
  router.push({ path: '/plugin-detail', query: { name } });
};

const queryPlugin = async (type = 'all') => {
  console.log('=>', type);
  const [res, err] = await getList();
  if (err) {
    return;
  }
  return res;
};

onMounted(async () => {
  const type = route.query.type || '';
  renderList.value = await queryPlugin(type);
});
watch(
  () => route.query,
  async ({ type }) => {
    renderList.value = await queryPlugin(type);
  }
);
</script>
<style lang="stylus" scoped>
.desc {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.plugin-block {
  user-select: none;
  cursor: pointer;
}

.list-block {
  height: calc(100vh - 65px);
  overflow: auto;
}
</style>
