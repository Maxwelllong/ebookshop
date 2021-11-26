import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/es/button/style'
import 'vant/lib/index.css'
import {
  Button,
  NavBar,
  Field,
  CellGroup,
  Form,
  Tabbar,
  TabbarItem,
  Icon,
  Search,
  Area,
  Swipe,
  SwipeItem,
  ConfigProvider,
  Tab,
  Tabs,
  Lazyload,
  Collapse,
  CollapseItem,
  Sidebar,
  SidebarItem,
  Card,
  Image as VanImage,
  Tag,
  Toast,
  Popup,
  SubmitBar,
  Radio,
  Checkbox,
  Stepper,
  SwipeCell,
  Cell,
  CheckboxGroup
} from 'vant'

createApp(App).use(store).use(router)
  .use(Button).use(Cell).use(CheckboxGroup).use(SwipeCell).use(Icon).use(Collapse).use(CollapseItem).use(Lazyload).use(Swipe).use(Tab).use(Tabs).use(SwipeItem).use(Search).use(Area).use(NavBar).use(Field).use(CellGroup).use(Form).use(Tabbar).use(TabbarItem)
  .use(ConfigProvider).use(Stepper).use(Checkbox).use(Radio).use(SubmitBar).use(Popup).use(Toast).use(Tag).use(Sidebar).use(SidebarItem).use(Card).use(VanImage)
  .mount('#app')
