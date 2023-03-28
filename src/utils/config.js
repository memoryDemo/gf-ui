import { getConfigKey } from "@/api/system/config";


// 获取参数键值
export function useConfigValue(...args) {
    const res = ref({});
    return (() => {
      args.forEach((d, index) => {
        // res.value[d] = [];
        res.value[d.split(".").pop()]="";
        getConfigKey(d).then(resp => {
          res.value[d.split(".").pop()] = resp.data.configValue;
        })
      })
      return toRefs(res.value);
    })()
  }