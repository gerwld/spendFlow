import React, { useCallback } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next';

import { BaseView, SelectList, STHeader } from '@components';
import { CATEGORY_TYPES_MASKS } from '@constants';

const SCOperationType = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [state, setState] = React.useState({
    ...route.params.state
  });
  const theme = route.params.theme

  const onChangeInput = useCallback((name, value) => {
    if (name && value !== undefined) {
        setState({ ...state, [name]: value })
        if(state)
            route.params.onGoBack({data: { ...state, [name]: value }});
    }
}, [])

const handleGoBack = () => {
    // Pass data back to ScreenA using the onGoBack callback
    route.params.onGoBack({ data: { ...state } });
    navigation.goBack();
};

React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      if (route.params?.onGoBack) {
        route.params.onGoBack({ data: { ...state } });
      }
      navigation.dispatch(e.data.action);
    });
    return unsubscribe;
  }, [navigation, route.params, state]);

React.useEffect(() => {
    setState({ ...state, ...route.params.state });
}, [route.params])
  return (

    <BaseView>
      <STHeader
        onGoBack={handleGoBack}
        navigation={navigation}
        title={t("vt_cat_type")}
      />

      <View style={{ paddingTop: 14, flex: 1 }}>
        <SelectList
          theme={theme}
          style={{ flex: 1 }}
          currentValue={state.type}
          color={state.color}
          setValue={(v) => onChangeInput('type', v)}
          data={Object.keys(CATEGORY_TYPES_MASKS).map(e => ({ value: CATEGORY_TYPES_MASKS[e].type }))}
          title={t('label_type')}
        />
      </View>


    </BaseView>
  )
}

export default SCOperationType