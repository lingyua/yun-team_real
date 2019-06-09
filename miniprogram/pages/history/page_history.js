// pages/card/page_card.js
import Dialog from '../../vant-weapp/dist/dialog/dialog';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabnum: 0, //tab索引
    arroldcar: [],
    arroldsport: [],
    arroldstudy: [],
    arroldcustomize: [],
    delid: "",
    isCarShow: false,

    loadingcar: false, //加载图标
    endcar: false, //到底文字，无更多条数时激活
    listcar: 10, //出克初始取回条数

    loadingsport: false, //加载图标
    endsport: false, //到底文字，无更多条数时激活
    listsport: 10, //运动初始取回条数

    loadingstudy: false, //加载图标
    endstudy: false, //到底文字，无更多条数时激活
    liststudy: 10, //学习初始取回条数

    loadingcus: false, //加载图标
    endcus: false, //到底文字，无更多条数时激活
    listcus: 10, //自定义初始取回条数

  },
  changetab(res) {
    console.log(typeof (res.detail.index))
    this.setData({
      tabnum: res.detail.index
    })
  },

  onClose(res) {
    console.log(res);
    let index = res.currentTarget.dataset.index
    let arroldcar = this.data.arroldcar
    let arroldsport = this.data.arroldsport
    let arroldstudy = this.data.arroldstudy
    let arroldcustomize = this.data.arroldcustomize
    let that = this
    console.log(index);
    const {
      position,
      instance
    } = res.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除？',
          closeOnClickOverlay: true,
        }).then(() => {
          console.log('用户点击确定')
          wx.cloud.callFunction({
            name: "delete",
            data: {
              delid: res.currentTarget.dataset.id
            },
            success(res) {
              arroldcar.splice(index, 1)
              arroldsport.splice(index, 1)
              arroldstudy.splice(index, 1)
              arroldcustomize.splice(index, 1)
              that.setData({
                arroldcar,
                arroldsport,
                arroldstudy,
                arroldcustomize
              })
              wx.showToast({
                title: '完成',
                icon: 'success',
                duration: 2000,
              });
              instance.close();
            },
            fail() {
              wx.showModal({
                title: '提示',
                content: '系统错误，请稍后重试',
              })
            }
          })

        }).catch(() => {
          console.log('用户点击取消');
          instance.close();
        });;
        break;
    }
  },

  //上拉加载取回数据
  getlistcar() {
    let that = this
    wx.cloud.callFunction({
      name: "getoldcar",
      data: {
        listcar: that.data.listcar //向后端传listcar
      },
      success(res) {
        console.log("取到条数了");
        //成功后条数判断
        let listjudgecar = that.data.listcar - 10;
        if (res.result.data.length > listjudgecar) {
          console.log(3)
          that.setData({
            arroldcar: res.result.data
          })
        }
        if (res.result.data.length <= listjudgecar) {
          console.log(2)
          that.setData({
            arroldcar: res.result.data,
            endcar: true,
            loadingcar: false
          })
        }
      },
      fail() {}
    })
  },

  getlistsport() {
    let that = this
    wx.cloud.callFunction({
      name: "getoldsport",
      data: {
        listsport: that.data.listsport //向后端传listsport
      },
      success(res) {
        console.log("取到条数了");
        //成功后条数判断
        let listjudgesport = that.data.listsport - 10;
        if (res.result.data.length > listjudgesport) {
          console.log(3)
          that.setData({
            arroldsport: res.result.data
          })
        }
        if (res.result.data.length <= listjudgesport) {
          console.log(2)
          that.setData({
            arroldsport: res.result.data,
            endsport: true,
            loadingsport: false
          })
        }
      },
      fail() {}
    })
  },

  getliststudy() {
    let that = this
    wx.cloud.callFunction({
      name: "getoldstudy",
      data: {
        liststudy: that.data.liststudy //向后端传liststudy
      },
      success(res) {
        console.log("取到条数了");
        //成功后条数判断
        let listjudgestudy = that.data.liststudy - 10;
        if (res.result.data.length > listjudgestudy) {
          console.log(3)
          that.setData({
            arroldstudy: res.result.data
          })
        }
        if (res.result.data.length <= listjudgestudy) {
          console.log(2)
          that.setData({
            arroldstudy: res.result.data,
            endstudy: true,
            loadingstudy: false
          })
        }
      },
      fail() {}
    })
  },

  getlistcus() {
    let that = this
    wx.cloud.callFunction({
      name: "getoldcustom",
      data: {
        listcus: that.data.listcus //向后端传listcus
      },
      success(res) {
        console.log("取到条数了");
        //成功后条数判断
        let listjudgecus = that.data.listcus - 10;
        if (res.result.data.length > listjudgecus) {
          console.log(3)
          that.setData({
            arroldcustomize: res.result.data
          })
        }
        if (res.result.data.length <= listjudgecus) {
          console.log(2)
          that.setData({
            arroldcustomize: res.result.data,
            endcus: true,
            loadingcus: false
          })
        }
      },
      fail() {}
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    that.getlistcar();
    that.getlistsport();
    that.getliststudy();
    that.getlistcus();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    let that = this;
    wx.cloud.callFunction({
      name: "getoldcar",
      data: {
        listcar: that.data.listcar
      },
      success(res) {
        console.log(res.result.data.length);
        that.setData({
          arroldcar: res.result.data
        })
      },
      fail() {
        wx.showModal({
          title: '提示',
          content: '刷新错误，请稍后重试',
        })
      }
    })

    wx.cloud.callFunction({
      name: "getoldsport",
      data: {
        listsport: that.data.listsport
      },
      success(res) {

        that.setData({
          arroldsport: res.result.data
        })
      },
      fail() {
        wx.showModal({
          title: '提示',
          content: '刷新错误，请稍后重试',
        })
      }
    })

    wx.cloud.callFunction({
      name: "getoldstudy",
      data: {
        liststudy: that.data.liststudy
      },
      success(res) {
        that.setData({
          arroldstudy: res.result.data
        })
      },
      fail() {
        wx.showModal({
          title: '提示',
          content: '刷新错误，请稍后重试',
        })
      }
    })

    wx.cloud.callFunction({
      name: "getoldcustom",
      data: {
        listcus: that.data.listcus
      },
      success(res) {
        that.setData({
          arroldcustomize: res.result.data
        })
      },
      fail() {
        wx.showModal({
          title: '提示',
          content: '刷新错误，请稍后重试',
        })
      }
    })

    setTimeout(() => {
      wx.stopPullDownRefresh({
        success(res) {
          console.log(1)
        },
        fail() {
          wx.showModal({
            title: '提示',
            content: '系统错误，请稍后重试',
          })
        }
      })
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    console.log("触底了");
    if (this.data.tabnum === 0) {
      if (!that.data.endcar) {
        console.log(this.data.listcar)
        console.log(1)
        that.setData({
          loadingcar: true,
          listcar: that.data.listcar + 10
        })
        setTimeout(() => {
          that.getlistcar();
        }, 500);
      }
    }
    if (this.data.tabnum === 1) {
      if (!that.data.endsport) {
        console.log(this.data.listsport)
        console.log(2)
        that.setData({
          loadingsport: true,
          listsport: that.data.listsport + 10
        })
        setTimeout(() => {
          that.getlistsport();
        }, 500);
      }
    }
    if (this.data.tabnum === 2) {
      if (!that.data.endstudy) {
        console.log(this.data.liststudy)
        console.log(1)
        that.setData({
          loadingstudy: true,
          liststudy: that.data.liststudy + 10
        })
        setTimeout(() => {
          that.getliststudy();
        }, 500);
      }
    }
    if (this.data.tabnum === 3) {
      if (!that.data.endcus) {
        console.log(this.data.listcus)
        console.log(1)
        that.setData({
          loadingcus: true,
          listcus: that.data.listcus + 10
        })
        setTimeout(() => {
          that.getlistcus();
        }, 500);
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})