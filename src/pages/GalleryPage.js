import React, { useState, useCallback } from 'react';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';

const categories = [
  {
    id: 'night',
    label: 'Exploration 01',
    title: 'Night',
    subtitle: 'Stars, silence, and the celestial dance',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjWtSKwi6oZirogpm-7Mi5-8PYolEDWIbzNZ6SLFWqTfKv8xyvhy5nMh6w6GPoBRJlb-eb38TEnsMWT7TUYz6d5zOiFAV82jYqSHjdB9ZdGtJ5mrB05EBSgGiKMuwH1b9IkUhh6IJi8OXRACNe-_FF2BKtpO-MKEEatiJpAGnzbHXe91SPHXW0PHcGmkFL1no48ysH-OcijZ_VWkQ6Rvw6AbIEFbJOy9hkm7vEik-Q-J4my-djwG-6U7vieGkSh-KK_BwUlfCoGdj3',
    description: 'Under the vast canopy of stars, the wilderness reveals a side unseen by day. These images capture the celestial dance above Earth\'s most remote landscapes.',
    photos: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjWtSKwi6oZirogpm-7Mi5-8PYolEDWIbzNZ6SLFWqTfKv8xyvhy5nMh6w6GPoBRJlb-eb38TEnsMWT7TUYz6d5zOiFAV82jYqSHjdB9ZdGtJ5mrB05EBSgGiKMuwH1b9IkUhh6IJi8OXRACNe-_FF2BKtpO-MKEEatiJpAGnzbHXe91SPHXW0PHcGmkFL1no48ysH-OcijZ_VWkQ6Rvw6AbIEFbJOy9hkm7vEik-Q-J4my-djwG-6U7vieGkSh-KK_BwUlfCoGdj3', title: 'Celestial Canopy', location: 'Yellowstone', ratio: '16/9' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjyUOaxwtIwO91h6jGqpqEw9bZ4TII5m2zFZp3pWcYvFktFrumPGUqfzgEbFYIEGrEUPpGmGNyH6HsTRwLEElxaJr6pa17ywFG2caBRRIAggqCWPpbschsUHMJTbeCGsfRkceYFhTnx4dA50dvioEfwHb9lCfl12U1F6wPQ2-hVUpJRxGMzOT2JOBFmVTvMzAVql7hCrxehQik1e88djWCIGA7X03h7okqp9ct1INgoj-NihAgBaSCEY_cnx7baU6JsQsH5GxPmP7U', title: 'Desert Stars', location: 'Namib-Naukluft', ratio: '2/3' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRkulzW0wwNNlHsOltXRbOo-emt4NZJgBWqo78JgVsnjZw6siVH0AjsFX0kQLBSUrhZTfa6Q0vded2PQPOGlYCXvEgf9M6mjm3GRJscoXEmyBiGf_AoYBBWjXCILLqPKpqXjrLsEgdiZOwwKqSqUwS6OMEgSmsoonjh-6Fq_XJyE9fHRSR5hlguNBeAYiJjBjkFX_hHYbyZ2DNAXJ1qutYrArinboDrTZUcAIJwtq94GlO3CuVSZ1qg06NrraXtwdUdntaarWRFES8', title: 'Twilight Ridge', location: 'Iceland', ratio: '3/2' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPK32q32Gz4AXeTJZ8LnRfhJt0r1KVH9A2_8gMwRZ6lpSJXMgvKqBN0Mma8ald0p2kahGo-dJMhTrQZZXGvUHQgGh8ymwADX6m-JfDpoJytz0XzazogQ3DD2-zQ812Pq3rdwtnnbNhMvI_lWYPYIhoi4GEzgtBvQ-6-lyRQI6RxwslevYVdriJebbw4RMoEjsIpWqYd4PzrFWs3l58IiWH3dkjC6hjbB3r-Aitn4xCK5E_fN2giXTHsVosGbOpJAsOikEvdD10f3MC', title: 'Moonlit Dew', location: 'Olympic Peninsula', ratio: '4/5' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9CNxx3TMGUb3NMS80bleXomx5TFIjTPgMUfQq9xF2s8soUFZ65NG71J-_lAzt-Z72HMp_8JUR7As-bQf5SViCjY82kL-VeZu_lHTPckp-XZR9fNEKbmoo7QW8zTqTNeevJxrni2TKmN_9bAztD-fsNJVET6FG_zdJOiiDXn8JYt0bI4frDvCY3dn_oHQqj_Uuo_zKDDoTVxZf1N8bBLsFaIYFhZRzyzNNADf4wG5RJUWdXH6iU8uaroPEAjDUGmmPpH33zzAWIZFi', title: 'Forest Glow', location: 'Redwoods', ratio: '5/4' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSPXtyLCFyprxcqZ5Wb-AOhVDivgqwywKRm5-fWYDFiW6isYVdZkELioTwdbw1Xwh8OY6zvStPZXrcryGogM4B401o1JiWlAUBNXRtd5JbBIKtHBNv8h7lNZWNPqWsWjZSX_K_zOZ_QM7x7kQmjfZlUTudBbm5eS-SSUPY2WSULRwRUlVGjm4DblLptsAeX2EBqHt2JXWhADtCgd-UDc6dP3z94-4veplFMjYjavkym-YMhg4XnCZTSB5D1t_fJKCNnSwmGrKOGDnt', title: 'Ancient Fog', location: 'Olympic Peninsula', ratio: '3/4' },
    ],
  },
  {
    id: 'landscape',
    label: 'Exploration 02',
    title: 'Landscape',
    subtitle: 'The grand architecture of the natural world',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHCZQBeRGc-zFHlh1d1lDJGP2fhkKeHnB7vhD8Q027Do6tLIxrqIJ5_aQoC2og35tmNIv1fibyHhkLWfK_rJ2G3jggEoQ1nA4LH9zzv58K-XlCmAhA-jXVyGZohMJrkv0fkNRFe_2JQ9Xr6zyrJ7vK444xqI80yq4f9YpqNESj7UDoyLAIlWFCPWCG0DFT8u_DmcYLTjI09gg-mUsE6BL28_UUiIS3FVxkIlNf4u1wTDd606n_zvQI6sAsjzZgsgYSs8tHFCidL30Y',
    description: 'From volcanic ridges to glacial valleys, these images document the raw geometry of Earth\'s most dramatic terrain.',
    photos: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHCZQBeRGc-zFHlh1d1lDJGP2fhkKeHnB7vhD8Q027Do6tLIxrqIJ5_aQoC2og35tmNIv1fibyHhkLWfK_rJ2G3jggEoQ1nA4LH9zzv58K-XlCmAhA-jXVyGZohMJrkv0fkNRFe_2JQ9Xr6zyrJ7vK444xqI80yq4f9YpqNESj7UDoyLAIlWFCPWCG0DFT8u_DmcYLTjI09gg-mUsE6BL28_UUiIS3FVxkIlNf4u1wTDd606n_zvQI6sAsjzZgsgYSs8tHFCidL30Y', title: 'Dawn Ridge', location: 'Patagonia', ratio: '4/3' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp2yr2C8XuAxbvH-PWVHsPcLIssnbcwoD3zcJ3OltPE0_LDjY9LhkXygNObtqJDHc0g9pE5bcHfTZ2YSAiRurPIl7Wrt2IkV7-4WdcRUcCoIn4CEY_4pydfVzzMKQtvudZ9xfXjaw4JPmzh666OlEHupTUgUGfnlvk1DGWRgLj7l7rvqF8Hdi993t9D_YNfZwf-3Jx_7iiELc89tmAkVt0kvkIbqTmnqBO3743vhYgrojxv1E9rSlHzp98wI_q3ZmHWHxIK-u8WnyS', title: 'Blue Hour Peaks', location: 'Torres del Paine', ratio: '2/3' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTSfuUb0y0kdBnkUAMJiMl3VT-5kAMcvok2wOxn-PfiG4izX2LfxiHBWJD-AN7gWAT7lyoQTh7E4F_JBznMq7GlYxxm_a_t8Dsr9i6OIMv5RZp_gZnap9VUPifMB1Eu8sxhZ7FI95TpBvdDjD9Oo4SAxymFPCQFyjN9kZEHJZtVm0wICI_uYFgtwmI5LlJ982E4PV6TPi6WPnc-bnpA6ZdO7o_tWLJ8PRh0X7Ua6fcwI-7I2PuK1ef7ncuwk46AZRVtRcBzThoKasS', title: 'Golden Hour Reflections', location: 'Lofoten Islands', ratio: '16/9' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs9IZ_TnBNEccLqJIuG1ItxI9sS_9jUnrE6MyA6EM43gH36oI9geNLgsQ1CB6oAm78IeomNkZ1SjJWd72djSxjxRTCwT5unnpKe0uF5R1kOheK2dGvOF8a9UArPewDemJcvR4bfyCLwbClHmUT9s0rt5I_3azllK2FW2Kz9S_VDAPT4VU5NqCB_tA-qOjLhWzREwEbAfpkjyigRf0jq7laK9daIG1kABUdu1bQDz3vEQ_1eENUNk904yT-uUkq1ZuUAJSclDEVRYHc', title: 'Glacial Silence', location: 'Vatnajökull', ratio: '3/2' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZit_r1KpQJDY2XDEc-mRNCrxkE4LuR1rdPrRW5S3JOxoUI0VNmBLy5P3IfSWDcoHnNHvhkWtkGE28RV0CHA49Bf8q4crYt9NxrAcMnmKWHJZIqcJ8SUaHAnoi2UoaI9YUcb63kMJbcH8F63-cJWFX6OUipzTeZBPbOGLdYCKWUNEnAtq7a0hYI2f0z0EiM1sKaRWCVRdmCMXi4xxxby9ssmXjPukbIU266T9c42SFaExMGnEhdQ8JJRJQ3wvcywuyCFDNysUh35f-', title: 'Solitary Oak', location: 'Tuscany', ratio: '5/4' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_0fdLqC9vVpVocIR-cbV8vHfnyOV5YbNT9--ANce3XvxFGGXy06VSaQjEueHJCnG-D7iSFYIFiaGub2NlkLa1EayVuW0u0_K6Uz9rtuW-yhcbvt03psjROg9yPLvh0waqrLjp1YXDmOcELXafa7XFnU9SczVzytdl048kAS8jie1uYErk1ZqgxK1JGqAuhr4pByhhbkqHbh_gwROBTgqoocWO7TfDEPTS-T8kMkib619CDEhKFflfUR2iOop5Bw0y39sujMz2X4xL', title: 'Sculpted Canyon', location: 'Utah', ratio: '4/5' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz-9hkqu8-8zsvyi3Jcnb59-_JG1bsFR8vsrrl0Ke2FlnpMqBc6EH_tKO1M4hmi6OGqt7thtm5Igg_8L9NOYgEQAPwBJdAMEswOi0q3ByADgM3qyEgP3SbMCZdh0Mxcrkg9JbSNN_EprQmwRA6SRXOfu5qm0O3PSQgwW_-WD8904X-_ovnCpICMHZhxAZMkqFY7syKiKiehjyPEOA-3vqkLSv7FArq9OrTmLzN5Wlc3lvUdBj0Jyl0W65jlL22a7LTRIMM-zqWawTr', title: 'Highland Mist', location: 'Iceland', ratio: '3/2' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6pUmrQNhfzksuSfYGf4UWkFNMuD8Aa18gacB2yrNxJ83EdbuMwDFJYDOvlGaZwN6b9Xn71aBD1EGbL5BjsLvVeM1EIvSDecgWyXWmR4oPbdlV-JKhEBx8yBHpWxiAZ8f6et796I8eFPvna5JmPETCw5k5XXCCNeyqt6izr2QAWmSujyQhylod9Q1glR8mPyXvBgj4_4C-f39hHrGhBCj1nVBYWqMtUTNdhOn3L-NAhTrO-U3jqHfu15PHe0GttIVVVA3HCLTRkI1g', title: 'Temperate Canopy', location: 'Vancouver Island', ratio: '3/4' },
    ],
  },
  {
    id: 'intimate',
    label: 'Exploration 03',
    title: 'Intimate Landscape',
    subtitle: 'The beauty found in the smallest details',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDmYujfsV6FVq74P2MKIZ29-Ay_3znnPydU1i2F1upFjgfs9Y0dffcDqmUQ3Zouhr5H6rInA15uy5KBwsZPUsqZiMZniDhHInufFWRIaqMf2_1HHSBUMSSPLqUd81J3rDo6RytIeiRq89lpjF6YX-0_qR3a4IPOYL1oIdOok2INIV5RYC4-fqQKJRm-2Jyfwu8UD5XlRrz6tIZ9yVZhZ5bf5s_QKRVVBwn0eYbNO_W6VhzLbTZmTzccpWjsVtWXp-C-n_-sIzJOndb',
    description: 'Not all grandeur requires scale. These images explore the textures, patterns, and quiet moments hidden in plain sight.',
    photos: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDmYujfsV6FVq74P2MKIZ29-Ay_3znnPydU1i2F1upFjgfs9Y0dffcDqmUQ3Zouhr5H6rInA15uy5KBwsZPUsqZiMZniDhHInufFWRIaqMf2_1HHSBUMSSPLqUd81J3rDo6RytIeiRq89lpjF6YX-0_qR3a4IPOYL1oIdOok2INIV5RYC4-fqQKJRm-2Jyfwu8UD5XlRrz6tIZ9yVZhZ5bf5s_QKRVVBwn0eYbNO_W6VhzLbTZmTzccpWjsVtWXp-C-n_-sIzJOndb', title: 'Forest Floor', location: 'Pacific Northwest', aspect: 'landscape' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmn7-9-V_4FFua3w5Vvg8Y2q9pGjbAn-l-RUGLlEGy3KPITbW06vv8kO4V2EAsJmXU3YW9T_uxucVu2KhIS6EqT08TpIJF0ssPdb7YrcY2vW-zDretG3SG7ryyNL2NRq4r_FrLzBLjWDMgHMMRHUgxRQWtaVK07mgduxPj21wbB9dUVc7pzK8aqARqpkkoB-ZhC2cb88f7FpV6T6nW9FiG2J2-CoJkDMUYCzxw2vZugSfxzuWARXO0wjT5NvIkZdRs_YIc0iVPZA0i', title: 'Winter Wolf', location: 'Arctic Circle', aspect: 'landscape' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOAfFPACpulOJHAhObt7DdmrwXXNbGBEcXB9B43icUA2PG6qzNAyYk3XC3ff1d_lPsui9fzgFnl42f__b3bQ3eyoL0oJTioNkT1SMchKmKdterOEJCNaPGx1J0LMYjeRvsM-_Aa0YKwb76yRSyn-5huS-tKq8nErP87o1a0vuLfbmYTGqC09eH-4VU1t2JKVE8Gk-WQvkIhkxFTd1_FSIgf9d0yTZYCu2zgWBbqd4-95vuWUJOYU2H2zdTJZpYPvzloGvQlkjkWAFW', title: 'Emerald Veil', location: 'Oregon', aspect: 'portrait' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK16wqwJIj_EJvN05J1Of6Jn-VvY16eSneV-HVJTDB0_jWMRPkfHyKyU5wzfHasDWFJ8dtSIr5dr3xW48oEZa26wcOICt6EeTFD726H2lTTk-VtM466Bf7jj0igPmDB77zvyTwojQCZmnFJUZvPXBO4G1US7WpBQJefi-OkxgrVKvOgGs3NbDuYYjAFu63ufibujmZlt83B-u531o9f_lVv-Oobv-65obK85w2P8HGiOPzeYI3En_ebjsYJRSzQz7cZcXqlavVd1_F', title: 'Aerial Veins', location: 'Iceland', aspect: 'landscape' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASzMg20QSluNYRohlzHUs7eKyJx-Y_zJPcwvB2r9V_mrc8X4FsD6CvfiRP0pQ6GORYE471bml1OH8uE45kGahDpn_mkIDzVDoxUlKNV-LFylVq8YHchzvFS-10olCgq-nTR30rAgJUqwslQ7LrKIzzVpGzLCW_cDMf5C6BgQD9RC-fomnAPg3VG4V1e-OhrgJH3JMqT7yi4XuG5E25pMWeo5OeTJ53kfC9990H_y_y-kpRBA1F9xEa9AWgGqGjLxXJVi3n8pBbrXZ1', title: 'Silken Flow', location: 'Columbia Gorge', aspect: 'portrait' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUjaqzpiCSr2f4VwkReApzYUaxoF0cQbPuon8HhwqCxBLrZNKS2c0tdWQ85OoybBGI-Z1G0R3t18-w9NDhRjkuQDr0w14pcCU25ddjJG2XQaFD-Dmuupn823DmBahxWhsVT29OFPYZyo0nXjMkhOLCfBGfSZLDxWuQET7dWbQL6CN_dXWd4PiARJKcKDyD2kMpNiuFfZ5i7YycfuKlZsalgMz_502WyOKurgcPrSDb-WPqqAuFTcaDTt8rv17vb0VWdNud9fMc3oFz', title: 'Misty Portrait', location: 'Svalbard', aspect: 'portrait' },
    ],
  },
  {
    id: 'people',
    label: 'Exploration 04',
    title: 'People in Nature',
    subtitle: 'The human figure dwarfed by the wild',
    cover: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUjaqzpiCSr2f4VwkReApzYUaxoF0cQbPuon8HhwqCxBLrZNKS2c0tdWQ85OoybBGI-Z1G0R3t18-w9NDhRjkuQDr0w14pcCU25ddjJG2XQaFD-Dmuupn823DmBahxWhsVT29OFPYZyo0nXjMkhOLCfBGfSZLDxWuQET7dWbQL6CN_dXWd4PiARJKcKDyD2kMpNiuFfZ5i7YycfuKlZsalgMz_502WyOKurgcPrSDb-WPqqAuFTcaDTt8rv17vb0VWdNud9fMc3oFz',
    description: 'Solitary figures against vast landscapes — a reminder of our place in the natural order. These images capture the quiet confrontation between human scale and wilderness.',
    photos: [
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUjaqzpiCSr2f4VwkReApzYUaxoF0cQbPuon8HhwqCxBLrZNKS2c0tdWQ85OoybBGI-Z1G0R3t18-w9NDhRjkuQDr0w14pcCU25ddjJG2XQaFD-Dmuupn823DmBahxWhsVT29OFPYZyo0nXjMkhOLCfBGfSZLDxWuQET7dWbQL6CN_dXWd4PiARJKcKDyD2kMpNiuFfZ5i7YycfuKlZsalgMz_502WyOKurgcPrSDb-WPqqAuFTcaDTt8rv17vb0VWdNud9fMc3oFz', title: 'Solitary Observer', location: 'Svalbard', aspect: 'landscape' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz-9hkqu8-8zsvyi3Jcnb59-_JG1bsFR8vsrrl0Ke2FlnpMqBc6EH_tKO1M4hmi6OGqt7thtm5Igg_8L9NOYgEQAPwBJdAMEswOi0q3ByADgM3qyEgP3SbMCZdh0Mxcrkg9JbSNN_EprQmwRA6SRXOfu5qm0O3PSQgwW_-WD8904X-_ovnCpICMHZhxAZMkqFY7syKiKiehjyPEOA-3vqkLSv7FArq9OrTmLzN5Wlc3lvUdBj0Jyl0W65jlL22a7LTRIMM-zqWawTr', title: 'Highland Walker', location: 'Iceland Highlands', aspect: 'landscape' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7nwtAO8uszQ0KlA6zXwyKWs14WZxu4JR572gIhHvsLMUfKc_ZdnGter-T9fB2G6O9uzaFfuz6WHAEl_qqEcoWmQhYDRxQ3qQhdyqImXJobgzvv8JHC5uO8_07Z6Z6s1jZTQz-IRYPNopQNZxkUOx6DriupAwcY0aN-WadHBHD77W5PZ2zFAjglmS0mW7vSE7hy-12Ujmt1k0lC1IM-rXfJifJvAr-6Qynamymy-_iKJgt8EZrF_ffNV8WIoj88gX3rBO_dgZqisRc', title: 'Forest Cathedral', location: 'Redwoods, California', aspect: 'portrait' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs9IZ_TnBNEccLqJIuG1ItxI9sS_9jUnrE6MyA6EM43gH36oI9geNLgsQ1CB6oAm78IeomNkZ1SjJWd72djSxjxRTCwT5unnpKe0uF5R1kOheK2dGvOF8a9UArPewDemJcvR4bfyCLwbClHmUT9s0rt5I_3azllK2FW2Kz9S_VDAPT4VU5NqCB_tA-qOjLhWzREwEbAfpkjyigRf0jq7laK9daIG1kABUdu1bQDz3vEQ_1eENUNk904yT-uUkq1ZuUAJSclDEVRYHc', title: 'Glacier Crossing', location: 'Vatnajökull', aspect: 'landscape' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRkulzW0wwNNlHsOltXRbOo-emt4NZJgBWqo78JgVsnjZw6siVH0AjsFX0kQLBSUrhZTfa6Q0vded2PQPOGlYCXvEgf9M6mjm3GRJscoXEmyBiGf_AoYBBWjXCILLqPKpqXjrLsEgdiZOwwKqSqUwS6OMEgSmsoonjh-6Fq_XJyE9fHRSR5hlguNBeAYiJjBjkFX_hHYbyZ2DNAXJ1qutYrArinboDrTZUcAIJwtq94GlO3CuVSZ1qg06NrraXtwdUdntaarWRFES8', title: 'Dawn Silhouette', location: 'Iceland', aspect: 'portrait' },
      { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSPXtyLCFyprxcqZ5Wb-AOhVDivgqwywKRm5-fWYDFiW6isYVdZkELioTwdbw1Xwh8OY6zvStPZXrcryGogM4B401o1JiWlAUBNXRtd5JbBIKtHBNv8h7lNZWNPqWsWjZSX_K_zOZ_QM7x7kQmjfZlUTudBbm5eS-SSUPY2WSULRwRUlVGjm4DblLptsAeX2EBqHt2JXWhADtCgd-UDc6dP3z94-4veplFMjYjavkym-YMhg4XnCZTSB5D1t_fJKCNnSwmGrKOGDnt', title: 'Into the Mist', location: 'Olympic Peninsula', aspect: 'landscape' },
    ],
  },
];

/* ─── Lightbox ─── */
function Lightbox({ photo, onClose, onPrev, onNext }) {
  React.useEffect(() => {
    if (!photo) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [photo, onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/92 backdrop-blur-sm" onClick={onClose}>
      <button className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors" onClick={onClose}>
        <span className="material-symbols-outlined text-2xl">close</span>
      </button>
      <button className="absolute left-6 top-1/2 -translate-y-1/2 text-white/25 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
        <span className="material-symbols-outlined text-4xl">chevron_left</span>
      </button>
      <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/25 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); onNext(); }}>
        <span className="material-symbols-outlined text-4xl">chevron_right</span>
      </button>
      <div className="max-w-[90vw] max-h-[85vh] relative" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photo.title} className="max-w-full max-h-[85vh] object-contain" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
          <h4 className="font-headline text-xl text-white">{photo.title}</h4>
          <p className="font-label text-xs text-white/50 mt-1">{photo.location}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Category Overview (bento grid) ─── */
function CategoryOverview({ onSelectCategory }) {
  return (
    <>
      <ScrollReveal>
        <header className="mb-16 max-w-4xl">
          <span className="text-tertiary font-label text-[10px] tracking-[0.4em] uppercase mb-4 block">Portfolio</span>
          <h1 className="font-headline text-5xl md:text-7xl text-on-surface leading-tight tracking-tight">
            Immersion into <br /> <span className="italic font-light text-primary">the Wild</span>
          </h1>
          <p className="font-body text-on-surface-variant text-lg max-w-2xl mt-6 leading-relaxed">
            A curated selection of natural landscapes and inhabitants. Each category represents years of patience, trekking, and the pursuit of perfect light.
          </p>
        </header>
      </ScrollReveal>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-32">
        {/* Night — large */}
        <ScrollReveal className="md:col-span-8">
          <div
            className="group relative overflow-hidden cursor-pointer aspect-[4/5] md:aspect-auto md:h-[700px]"
            onClick={() => onSelectCategory('night')}
          >
            <img className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="Night sky" src={categories[0].cover} />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/90 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-10 left-10 transition-transform duration-500 group-hover:-translate-y-2">
              <span className="text-tertiary font-label text-[10px] uppercase tracking-[0.3em] block mb-2">Exploration 01</span>
              <h2 className="font-headline text-4xl text-on-surface">Night</h2>
              <p className="text-on-surface-variant font-label text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Stars, silence, and the celestial dance</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Landscape — tall */}
        <ScrollReveal className="md:col-span-4" delay={0.1}>
          <div
            className="group relative overflow-hidden cursor-pointer aspect-square md:aspect-auto md:h-[700px]"
            onClick={() => onSelectCategory('landscape')}
          >
            <img className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="Mountain vista" src={categories[1].cover} />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/90 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-10 left-10 transition-transform duration-500 group-hover:-translate-y-2">
              <span className="text-tertiary font-label text-[10px] uppercase tracking-[0.3em] block mb-2">Exploration 02</span>
              <h2 className="font-headline text-4xl text-on-surface">Landscape</h2>
              <p className="text-on-surface-variant font-label text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">The grand architecture of the natural world</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Intimate — medium */}
        <ScrollReveal className="md:col-span-7" delay={0.15}>
          <div
            className="group relative overflow-hidden cursor-pointer aspect-video md:aspect-auto md:h-[500px]"
            onClick={() => onSelectCategory('intimate')}
          >
            <img className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="Forest floor" src={categories[2].cover} />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/90 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-10 left-10 transition-transform duration-500 group-hover:-translate-y-2">
              <span className="text-tertiary font-label text-[10px] uppercase tracking-[0.3em] block mb-2">Exploration 03</span>
              <h2 className="font-headline text-4xl text-on-surface">Intimate Landscape</h2>
              <p className="text-on-surface-variant font-label text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">The beauty found in the smallest details</p>
            </div>
          </div>
        </ScrollReveal>

        {/* People in Nature */}
        <ScrollReveal className="md:col-span-5" delay={0.2}>
          <div
            className="group relative overflow-hidden cursor-pointer aspect-[3/4] md:aspect-auto md:h-[500px]"
            onClick={() => onSelectCategory('people')}
          >
            <img className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="Person in wilderness" src={categories[3].cover} />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/90 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-10 left-10 transition-transform duration-500 group-hover:-translate-y-2">
              <span className="text-tertiary font-label text-[10px] uppercase tracking-[0.3em] block mb-2">Exploration 04</span>
              <h2 className="font-headline text-4xl text-on-surface">People in Nature</h2>
              <p className="text-on-surface-variant font-label text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">The human figure dwarfed by the wild</p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

/* ─── Category Detail Page ─── */
function CategoryDetail({ category, allCategories, onBack, onSelectCategory, onPhotoClick }) {
  return (
    <>
      <style>{`
        @keyframes gridReveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero — full-bleed cover */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden -mx-8 md:-mx-16 lg:-mx-24">
        <img src={category.cover} alt={category.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-8 md:left-16 flex items-center gap-2 text-on-surface-variant/60 hover:text-primary transition-colors group"
        >
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="font-label text-xs uppercase tracking-widest">All Categories</span>
        </button>

        {/* Category info — left side */}
        <div className="absolute bottom-12 left-8 md:left-16 lg:left-24 max-w-2xl">
          <span className="text-tertiary font-label text-[10px] uppercase tracking-[0.3em] block mb-3">{category.label}</span>
          <h1 className="font-headline text-5xl md:text-7xl text-on-surface mb-4">{category.title}</h1>
          <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-lg">{category.description}</p>
          <div className="mt-6 font-label text-[10px] text-on-surface-variant/40 uppercase tracking-widest">
            {category.photos.length} photographs
          </div>
        </div>

        {/* Category nav — right side, vertical, inside the hero */}
        <div className="absolute right-8 md:right-16 bottom-12 hidden md:flex flex-col items-end gap-4">
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => cat.id !== category.id && onSelectCategory(cat.id)}
              className={`font-headline text-sm tracking-wide transition-all duration-300 text-right ${
                cat.id === category.id
                  ? 'text-tertiary'
                  : 'text-white/25 hover:text-white/70'
              }`}
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry photo grid — each photo uses its own aspect ratio */}
      <section className="mt-16 mb-32">
        <div className="columns-2 md:columns-3 gap-4 md:gap-6">
          {category.photos.map((photo, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-4 md:mb-6 group relative overflow-hidden cursor-pointer"
              style={{ animation: `gridReveal 0.5s ${i * 0.06}s both` }}
              onClick={() => onPhotoClick(i)}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0">
                <h4 className="font-headline text-base text-white">{photo.title}</h4>
                <p className="font-label text-[10px] text-white/50 mt-0.5">{photo.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ─── Gallery Page ─── */
export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const category = categories.find(c => c.id === selectedCategory);

  const selectCategory = useCallback((id) => {
    setSelectedCategory(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const goBack = useCallback(() => {
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const openLightbox = useCallback((index) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const navigateLightbox = useCallback((dir) => {
    if (!category) return;
    const len = category.photos.length;
    setLightboxIndex(prev => (prev + dir + len) % len);
  }, [category]);

  const currentPhoto = category && lightboxIndex !== null ? category.photos[lightboxIndex] : null;

  return (
    <div className="page-content">
      <main className="pt-28 px-8 md:px-16 lg:px-24 min-h-screen bg-background">
        {selectedCategory && category ? (
          <CategoryDetail
            key={selectedCategory}
            category={category}
            allCategories={categories}
            onBack={goBack}
            onSelectCategory={selectCategory}
            onPhotoClick={openLightbox}
          />
        ) : (
          <CategoryOverview onSelectCategory={selectCategory} />
        )}
      </main>

      <Footer />

      <Lightbox
        photo={currentPhoto}
        onClose={closeLightbox}
        onPrev={() => navigateLightbox(-1)}
        onNext={() => navigateLightbox(1)}
      />
    </div>
  );
}
