const url = (name: string, params: any) => {
  let route = name;

  for (const key in params) {
    const value = params[key];
    const param = `:${key}`;

    if (route.includes(param)) {
      route = route.replace(param, value);
    }
  }

  return route;
}

export default url;
