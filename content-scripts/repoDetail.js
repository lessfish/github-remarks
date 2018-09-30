// repo 详情页
if (document.querySelector('.pagehead-actions')) {
  const author = document.querySelector('#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div > h1 > span.author > a').innerText
  const repoName = document.querySelector('#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div > h1 > strong > a').innerText
  const repoKey = author + '/' + repoName

  chrome.storage.local.get('github-repo-remarks', res => {
    let obj = res['github-repo-remarks'] || {}
    const remark = obj[repoKey]
    // 已经有备注过
    if (remark) {
      const el = document.querySelector('#js-repo-pjax-container > div.container.new-discussion-timeline.experiment-repo-nav > div.repository-content > div.mb-3 > div.f4 > span.text-gray-dark.mr-2')

      const html =
      `
      <div>
        <div class="btn-group" style="margin-top:10px; margin-bottom:-20px">
          <span id="origin-remarks-content">${remark}</span>
          <a href="javascript:;" class="btn btn-sm" id="add-remarks-btn">Edit Note</a>
        </div>
        <div style="display:none;margin-bottom:-20px;margin-top:26px" id="edit-remarks-area">
          <textarea class="form-control comment-form-textarea" id="remarks-content">${remark}</textarea>
          <a href="javascript:;" class="btn btn-sm btn-primary" id="save-remarks-btn" style="margin-top: 5px">Save</a>
          <a href="javascript:;" class="btn btn-sm btn-danger" id="del-remarks-btn" style="margin-top: 5px">Delete</a>
        </div>
      </div>
      `

      el.insertAdjacentHTML('beforeend', html)

      document.querySelector('#add-remarks-btn').onclick = () => {
        document.querySelector('#edit-remarks-area').style.display = 'block'
        document.querySelector('#origin-remarks-content').style.display = 'none'
        document.querySelector('#add-remarks-btn').style.display = 'none'
        return false
      }

      document.querySelector('#save-remarks-btn').onclick = () => {
        let content = document.querySelector('#remarks-content').value

        chrome.storage.local.get('github-repo-remarks', res => {
          let obj = res['github-repo-remarks'] || {}
          obj[repoKey] = content

          chrome.storage.local.set({'github-repo-remarks': obj}, () => {
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
            location.reload()
          })
        })

        return false
      }
    } else {
      const el = document.querySelector('#js-repo-pjax-container > div.container.new-discussion-timeline.experiment-repo-nav > div.repository-content > div.mb-3 > div.f4 > span.text-gray-dark.mr-2')

      const html =
      `
      <div>
        <div class="btn-group" style="margin-top:10px; margin-bottom:-20px">
          <a href="javascript:;" class="btn btn-sm" id="add-remarks-btn">Add Note</a>
        </div>
        <div style="display:none;margin-bottom:-20px;margin-top:26px;" id="edit-remarks-area">
          <textarea class="form-control comment-form-textarea" id="remarks-content"></textarea>
          <a href="javascript:;" class="btn btn-sm btn-primary" id="save-remarks-btn" style="margin-top: 5px">Save</a>
          <a href="javascript:;" class="btn btn-sm btn-danger" id="del-remarks-btn" style="margin-top: 5px">Delete</a>
        </div>
      </div>
      `

      el.insertAdjacentHTML('beforeend', html)

      document.querySelector('#add-remarks-btn').onclick = () => {
        document.querySelector('#edit-remarks-area').style.display = 'block'
        document.querySelector('#add-remarks-btn').style.display = 'none'
        return false
      }

      document.querySelector('#save-remarks-btn').onclick = () => {
        let content = document.querySelector('#remarks-content').value

        chrome.storage.local.get('github-repo-remarks', res => {
          let obj = res['github-repo-remarks'] || {}
          obj[repoKey] = content

          chrome.storage.local.set({'github-repo-remarks': obj}, () => {
            location.reload()
          })
        })

        return false
      }
    }
  })
}