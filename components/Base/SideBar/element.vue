<template>
  <div class="py-1">
    <div
      class="w-full py-1 pl-1 flex gap-3 items-center bg-black bg-opacity-0 hover:bg-opacity-25 duration-150 rounded-md select-none cursor-pointer"
    >
      <svg
        v-if="$props.type === 'home'"
        width="37"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="duration-150"
          d="M35.4436 15.6262C36.7032 16.7959 37.3332 17.3807 37.6666 18.1454C38 18.9101 38 19.7696 38 21.4886V34C38 37.7712 38 39.6568 36.8284 40.8284C35.6568 42 33.7712 42 30 42H28H20H18C14.2288 42 12.3431 42 11.1716 40.8284C10 39.6568 10 37.7712 10 34V21.4886C10 19.7696 10 18.9101 10.3334 18.1454C10.6669 17.3807 11.2967 16.7959 12.5564 15.6262L17 11.5L18.5564 10.0548C21.1382 7.6573 22.4292 6.45856 24 6.45856C25.5708 6.45856 26.8618 7.6573 29.4436 10.0548L31 11.5L35.4436 15.6262Z"
          :stroke="color"
          stroke-width="4"
          stroke-linejoin="round"
        />
        <path
          class="duration-150"
          d="M20 42V34C20 31.7908 21.7908 30 24 30C26.2092 30 28 31.7908 28 34V42"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-else-if="type === 'license'"
        width="37"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="duration-150"
          d="M38 5.99976H18C14.2288 5.99976 12.3431 5.99976 11.1716 7.17134C10 8.3429 10 10.2285 10 13.9998V20.9998V33.9998"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          class="duration-150"
          d="M28 33.9998V37.9998C28 40.209 29.7908 41.9998 32 41.9998C34.2092 41.9998 36 40.209 36 37.9998V17.9998V8.99976C36 7.3429 37.3432 5.99976 39 5.99976C40.6568 5.99976 42 7.3429 42 8.99976C42 10.6566 40.6568 11.9998 39 11.9998H37"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          class="duration-150"
          d="M32 42H10C7.79086 42 6 40.2092 6 38C6 35.7908 7.79086 34 10 34H28"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          class="duration-150"
          d="M18 13.9998H28"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          class="duration-150"
          d="M18 22H28"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-else-if="type === 'calendar'"
        width="37"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="duration-150"
          d="M6 20.6242C6 11.8754 7.87514 10.0002 16.624 10.0002H31.376C40.1248 10.0002 42 11.8754 42 20.6242V31.3762C42 40.125 40.1248 42.0002 31.376 42.0002H16.624C7.87514 42.0002 6 40.125 6 31.3762V20.6242Z"
          :stroke="color"
          stroke-width="4"
        />
        <path
          class="duration-150"
          d="M12 10.0002V6.00024"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
        />
        <path
          class="duration-150"
          d="M36 10.0002V6.00024"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
        />
        <path
          class="duration-150"
          d="M14 18.0002H34"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>

      <svg
        v-else-if="type === 'mail'"
        xmlns="http://www.w3.org/2000/svg"
        width="37"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          class="duration-150"
          d="M6 16C6 14.1362 6 13.2044 6.30448 12.4693C6.71046 11.4892 7.48916 10.7105 8.46926 10.3045C9.20436 10 10.1362 10 12 10H36C37.8638 10 38.7956 10 39.5308 10.3045C40.5108 10.7105 41.2896 11.4892 41.6956 12.4693C42 13.2044 42 14.1362 42 16V32C42 33.8638 42 34.7956 41.6956 35.5308C41.2896 36.5108 40.5108 37.2896 39.5308 37.6956C38.7956 38 37.8638 38 36 38H12C10.1362 38 9.20436 38 8.46926 37.6956C7.48916 37.2896 6.71046 36.5108 6.30448 35.5308C6 34.7956 6 33.8638 6 32V16Z"
          :stroke="color"
          stroke-width="4"
          stroke-linejoin="round"
        />
        <path
          class="duration-150"
          d="M8 12L21.366 23.6952C22.874 25.0148 25.126 25.0148 26.634 23.6952L40 12"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="type === 'bell'"
        xmlns="http://www.w3.org/2000/svg"
        width="37"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          class="duration-150"
          d="M18 36C18 36 18 42 24.0928 42C30.1858 42 30.1858 36 30.1858 36"
          :stroke="color"
          stroke-width="4"
          stroke-linejoin="round"
        />
        <path
          class="duration-150"
          d="M13.9929 15.4116L10.9235 31.2384C10.4447 33.7072 12.3356 36 14.8503 36H18H30H33.1498C35.6644 36 37.5554 33.707 37.0766 31.2384L34.007 15.4116C34.0024 15.3872 33.998 15.3655 33.9924 15.3413C33.8526 14.73 31.72 6 24 6C16.2801 6 14.1474 14.73 14.0075 15.3413C14.002 15.3655 13.9976 15.3872 13.9929 15.4116Z"
          :stroke="color"
          stroke-width="4"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="type === 'photo'"
        width="37"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="duration-150"
          d="M6 17.9522C6 8.1097 8.10952 6.00018 17.952 6.00018H30.048C39.8904 6.00018 42 8.1097 42 17.9522V30.0482C42 39.8906 39.8904 42.0002 30.048 42.0002H17.952C8.10952 42.0002 6 39.8906 6 30.0482V17.9522Z"
          :stroke="color"
          stroke-width="4"
        />
        <path
          class="duration-150"
          d="M34.009 33.0046L25.4558 24.4514C18.4962 17.4918 15.5128 17.4918 8.55316 24.4514L6 27.0046"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
        />
        <path
          class="duration-150"
          d="M42 27.3406C37.8136 24.1336 34.9556 24.584 30.396 28.692"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
        />
        <path
          class="duration-150"
          d="M34 16.0002C34 17.1047 33.1046 18.0002 32 18.0002C30.8954 18.0002 30 17.1047 30 16.0002C30 14.8956 30.8954 14.0002 32 14.0002C33.1046 14.0002 34 14.8956 34 16.0002Z"
          :stroke="color"
          stroke-width="4"
        />
      </svg>

      <svg
        v-else-if="type === 'chart'"
        xmlns="http://www.w3.org/2000/svg"
        width="37"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          class="duration-150"
          d="M24 14.0002V32.0002"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          class="duration-150"
          d="M32 18.0002V32.0002"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          class="duration-150"
          d="M16 22.0002V32.0002"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          class="duration-150"
          d="M6 24.0002C6 9.17724 9.177 6.00024 24 6.00024C38.823 6.00024 42 9.17724 42 24.0002C42 38.8232 38.823 42.0002 24 42.0002C9.177 42.0002 6 38.8232 6 24.0002Z"
          :stroke="color"
          stroke-width="4"
        />
      </svg>

      <svg
        v-else-if="type === 'cog'"
        width="37"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.51 8.37632C19.6854 10.3553 17.3731 11.2493 15.4266 10.3509C12.2058 8.8644 8.86421 12.206 10.3507 15.4267C11.2491 17.3733 10.3551 19.6856 8.37613 20.5102C5.27387 21.8028 5.27387 26.1976 8.37613 27.4902C10.3551 28.3148 11.2491 30.6272 10.3507 32.5736C8.86421 35.7944 12.2058 39.136 15.4266 37.6494C17.3731 36.751 19.6854 37.645 20.51 39.624C21.8026 42.7264 26.1974 42.7264 27.49 39.624C28.3146 37.645 30.627 36.751 32.5734 37.6494C35.7942 39.136 39.1358 35.7944 37.6492 32.5736C36.7508 30.6272 37.6448 28.3148 39.6238 27.4902C42.7262 26.1976 42.7262 21.8028 39.6238 20.5102C37.6448 19.6856 36.7508 17.3733 37.6492 15.4267C39.1358 12.206 35.7942 8.8644 32.5734 10.3509C30.627 11.2493 28.3146 10.3553 27.49 8.37632C26.1974 5.27406 21.8026 5.27406 20.51 8.37632Z"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M30 24.0002C30 27.314 27.3138 30.0002 24 30.0002C20.6862 30.0002 18 27.314 18 24.0002C18 20.6864 20.6862 18.0002 24 18.0002C27.3138 18.0002 30 20.6864 30 24.0002Z"
          :stroke="color"
          stroke-width="4"
        />
      </svg>

      <svg
        v-else-if="type === 'alert-circle'"
        width="37"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M42 24C42 33.9412 33.9412 42 24 42C14.0589 42 6 33.9412 6 24C6 14.0589 14.0589 6 24 6C33.9412 6 42 14.0589 42 24Z"
          :stroke="color"
          stroke-width="4"
        />
        <path
          d="M24 16V26"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
        />
        <path
          d="M24 32.0001V31.9777"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>

      <svg
        v-else-if="type === 'logout'"
        width="37"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M42 24H26"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M36 30L41.826 24.174C41.922 24.078 41.922 23.922 41.826 23.826L36 18"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M32 10V9C32 7.34314 30.6568 6 29 6H10C7.79088 6 6.00002 7.79086 6.00002 10V38C6.00002 40.2092 7.79088 42 10 42H29C30.6568 42 32 40.6568 32 39V38"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <svg
        v-else-if="type === 'contacts'"
        width="37"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 24.0002C6 9.17718 9.177 6.00018 24 6.00018C38.823 6.00018 42 9.17718 42 24.0002C42 38.8232 38.823 42.0002 24 42.0002C9.177 42.0002 6 38.8232 6 24.0002Z"
          :stroke="color"
          stroke-width="4"
        />
        <path
          d="M30 20.0002C30 23.314 27.3138 26.0002 24 26.0002C20.6862 26.0002 18 23.314 18 20.0002C18 16.6865 20.6862 14.0002 24 14.0002C27.3138 14.0002 30 16.6865 30 20.0002Z"
          :stroke="color"
          stroke-width="4"
        />
        <path
          d="M12 38.0002C13.2764 33.3858 16.56 32.0002 24 32.0002C31.44 32.0002 34.7236 33.2852 36 37.8996"
          :stroke="color"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>

      <p
        class="text-lg font-semibold duration-150"
        :style="`color: ${color};`"
        v-text="$props.text"
      />
      <p class="ml-auto" v-text="count" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?:
      | "home"
      | "license"
      | "calendar"
      | "mail"
      | "bell"
      | "photo"
      | "chart"
      | "cog"
      | "alert-circle"
      | "logout"
      | "contacts";
    text?: string;
    count?: number;
    color?: string;
  }>(),
  {
    type: "home",
    text: "Новости",
    color: "#EDE8D8",
  }
);
</script>
