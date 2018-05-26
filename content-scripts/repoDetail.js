// repo 详情页
if (document.querySelector('.pagehead-actions')) {
  const author = document.querySelector('#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div > h1 > span.author > a').innerHTML 
  const repoName = document.querySelector('#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div > h1 > strong > a').innerHTML 
  const repoKey = author + '/' + repoName

  chrome.storage.local.get('github-repo-remarks', res => {
    let obj = res['github-repo-remarks'] || {}
    const remark = obj[repoKey]

    // 已经有备注过
    if (remark) {
      var el = document.querySelector('#js-repo-pjax-container > div.container.new-discussion-timeline.experiment-repo-nav > div.repository-content > div.js-repo-meta-container > div.repository-meta.mb-0.js-repo-meta-edit.js-details-container > div')

      var html = 
      `
      <div>
        <div class="btn-group" style="margin-top:10px; margin-bottom:5px">
          <a href="javascript:;" class="btn btn-sm" id="add-remarks-btn">编辑我的备注</a>
          <a href="javascript:;" class="btn btn-sm" id="del-remarks-btn">清空这条备注</a>
        </div>
        <p id="origin-remarks-content">${remark}</p>
        <div style="display:none" id="edit-remarks-area">
          <textarea class="form-control comment-form-textarea" id="remarks-content" style="margin-bottom:5px">${remark}</textarea>
          <a href="javascript:;" class="btn btn-sm btn-primary" id="save-remarks-btn">保存</a>
        </div>
      </div>
      `

      el.insertAdjacentHTML('beforeend', html)

      document.querySelector('#add-remarks-btn').onclick = () => {
        document.querySelector('#edit-remarks-area').style.display = 'block'
        document.querySelector('#origin-remarks-content').style.display = 'none'
        return false
      }

      document.querySelector('#save-remarks-btn').onclick = () => {
        let content = document.querySelector('#remarks-content').value

        chrome.storage.local.get('github-repo-remarks', res => {
          let obj = res['github-repo-remarks'] || {}
          obj[repoKey] = content

          chrome.storage.local.set({'github-repo-remarks': obj}, () => {
            console.log('saved!')
            location.reload()
          })
        })

        return false
      }

      document.querySelector('#del-remarks-btn').onclick = () => {
        let content = document.querySelector('#remarks-content').value

        chrome.storage.local.get('github-repo-remarks', res => {
          let obj = res['github-repo-remarks'] || {}
          delete obj[repoKey]

          chrome.storage.local.set({'github-repo-remarks': obj}, () => {
            console.log('deleted!')
            location.reload()
          })
        })

        return false
      }
    } else {
      var el = document.querySelector('#js-repo-pjax-container > div.container.new-discussion-timeline.experiment-repo-nav > div.repository-content > div.js-repo-meta-container > div.repository-meta.mb-0.js-repo-meta-edit.js-details-container > div')

      var html = 
      `
      <div>
        <div class="btn-group">
          <a href="javascript:;" class="btn btn-sm" id="add-remarks-btn" style="margin-top:10px; margin-bottom:5px">增加我的备注</a>
        </div>
        <div style="display:none" id="edit-remarks-area">
          <textarea class="form-control comment-form-textarea" id="remarks-content" style="margin-bottom:5px"></textarea>
          <a href="javascript:;" class="btn btn-sm btn-primary" id="save-remarks-btn">保存</a>
        </div>
      </div>
      `

      el.insertAdjacentHTML('beforeend', html)

      document.querySelector('#add-remarks-btn').onclick = () => {
        document.querySelector('#edit-remarks-area').style.display = 'block'
        return false
      }

      document.querySelector('#save-remarks-btn').onclick = () => {
        let content = document.querySelector('#remarks-content').value

        chrome.storage.local.get('github-repo-remarks', res => {
          let obj = res['github-repo-remarks'] || {}
          obj[repoKey] = content

          chrome.storage.local.set({'github-repo-remarks': obj}, () => {
            console.log('saved!')
            location.reload()
          })
        })

        return false
      }
    }
  })
}