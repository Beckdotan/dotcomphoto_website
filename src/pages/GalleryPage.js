import React, { useState, useCallback, useEffect } from 'react';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';

const categories = [
  {
    id: 'night',
    label: 'Exploration 01',
    title: 'Night',
    subtitle: 'Stars, silence, and the celestial dance',
    cover: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_1400,q_auto,f_auto/v1774334429/%D7%A2%D7%95%D7%AA%D7%A7_%D7%A9%D7%9C_1_wcbfwi.jpg',
    description: 'Under the vast canopy of stars, the wilderness reveals a side unseen by day. These images capture the celestial dance above Earth\'s most remote landscapes.',
    // Featured: triptych row then full-width, before masonry
    featured: {
      triptych: [
        'https://res.cloudinary.com/diepbwdm5/image/upload/w_600,q_auto,f_auto/v1774262334/5_Large_qf7zvm.jpg',
        'https://res.cloudinary.com/diepbwdm5/image/upload/w_600,q_auto,f_auto/v1774250319/small_1_wnjmrc.jpg',
        'https://res.cloudinary.com/diepbwdm5/image/upload/w_600,q_auto,f_auto/v1774253991/3_1_Large_n8jrgv.jpg',
      ],
      hero: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_1400,q_auto,f_auto/v1774263759/e34be070-3626-4b63-a10e-222a8dff8a7d_egyccx.jpg',
    },
    featuredCount: 4, // first 4 photos are in the featured section, skip in masonry
    photos: [
      // Featured images (shown in triptych + hero, also used for lightbox navigation)
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262334/5_Large_qf7zvm.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250319/small_1_wnjmrc.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774253991/3_1_Large_n8jrgv.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263759/e34be070-3626-4b63-a10e-222a8dff8a7d_egyccx.jpg', title: '', location: '' },
      // Rest of the gallery
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263906/7e831d42-aac7-456a-9fac-18327688b842_cbltcv.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263528/untitled--7_Large_p2uyde.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262404/%D7%9E%D7%A9%D7%95%D7%9C%D7%91_Large_ynyw2p.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262397/%D7%9C%D7%91%D7%93_%D7%9E%D7%95%D7%9B%D7%9F_%D7%90%D7%99%D7%A0%D7%A1%D7%98%D7%92%D7%A8%D7%9D_Large_rcfo3f.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250341/8_n7xxhc.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250394/47244c72-aefb-4d50-9c02-04a965d71f12_vjqfcc.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774334429/%D7%A2%D7%95%D7%AA%D7%A7_%D7%A9%D7%9C_1_wcbfwi.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262345/12_Large_axpsjc.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262349/DSC_0251_Large_pwejga.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262360/DSC_0272_Large_ghgrps.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262377/untitled-2_Large_ny59fc.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262382/nomoon_Large_nhm7fj.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262389/DSC_6411_Large_bggfbf.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262393/untitled-7400_Large_m1lovv.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263459/DSC_0456-Edit_gcytkt.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524767/untitled--36_avqvt7.jpg', title: '', location: '' },
    ],
  },
  {
    id: 'landscape',
    label: 'Exploration 02',
    title: 'Landscape',
    subtitle: 'The grand architecture of the natural world',
    cover: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_1400,q_auto,f_auto/v1774524772/untitled-1799_1_kkmlxo.jpg',
    description: 'From volcanic ridges to glacial valleys, these images document the raw geometry of Earth\'s most dramatic terrain.',
    photos: [
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263520/untitled-2334_Large_iefide.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263427/DSC_5113_1_cqv58w.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262363/Duplicate_State_Large_nild4p.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262359/DSC_5811-1_Large_lmdmuv.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262352/DSC_4116-1_copy_copy_Large_noh1lp.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774253993/AUG_-_Mount_Cook._NZ_Large_npbwrn.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774251357/BBW_Supp_Dotan_Beck_Castle_point_lighthouse_heugaz.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774251053/untitled--3_dgk9ab.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774251027/Mountain_road_cddgkl.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250997/Hidden_woners_hxlgqj.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250988/Red_tgmeeq.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250424/f0c0edcb-a3b6-4f7e-86d0-a0df5d5601de_davo0g.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250307/DOT_2876_ilx8mh.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524772/untitled-1799_1_kkmlxo.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524680/READY_ENDS_cp8llz.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524560/DSC_8271_w80jeq.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524556/%D7%9C%D7%94%D7%93%D7%A4%D7%A1%D7%94_pxdpaz.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524549/DSC_4223_k8welg.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524519/DJI_0725_hh7bpc.jpg', title: '', location: '' },
    ],
  },
  {
    id: 'intimate',
    label: 'Exploration 03',
    title: 'Intimate Landscape',
    subtitle: 'The beauty found in the smallest details',
    cover: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_1400,q_auto,f_auto/v1774251074/untitled-6992_fuwyho.jpg',
    description: 'Not all grandeur requires scale. These images explore the textures, patterns, and quiet moments hidden in plain sight.',
    pinnedCount: 12,
    photos: [
      // Pinned top 9
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263513/DSC_9839sharp_Large_y4mpoz.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263510/DSC_9955-2_Large_icsquf.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262373/DSC_2425-HDR-Edit-3_Large_dxl7rk.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774251039/DSC_7054_nhcno9.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250932/Copy_of_untitled-3111_sgoxcl.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250267/DOT_7675_keofnf.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263523/untitled-9611_Large_hsmcg0.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263932/DSC_6594-HDR-Edit_nratyh.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262383/DSC_6895_Large_hgosbk.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774336475/DSC_9227-HDR_difffe.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774336452/DSC_8841_uolaj5.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774336380/DSC_0946-2_zfppl4.jpg', title: '', location: '' },
      // Rest (shuffled by masonry)
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263590/ld-export-b4372cd9-09152022_ffdb4s.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263586/ld-export-7f3708ba-09152022_zy1rkh.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263530/untitled-5709_Large_n0xuxy.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263447/DSC_3466_mfpg4v.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262398/%D7%9C%D7%94%D7%93%D7%A4%D7%A1%D7%94_Large_lhsvto.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262394/untitled-0096-2_Large_ltpicf.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262368/DSC_4315-HDR2_Large_qlxuug.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262365/untitled-3480_Large_uwuvt5.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774253995/%D7%9C%D7%94%D7%93%D7%A4%D7%A1%D7%94_Large_sg5zhn.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774251075/DSC_1473_rwd30y.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774251074/untitled-6992_fuwyho.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774251042/DSC_3023_drlvg2.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250991/Sunrise_with_the_seals_ehkwwx.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250983/The_world_is_crying_euhdqx.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250980/Feathers_kqyqnj.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250891/untitled--6_zfxx70.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250314/DOT_2959-Pano_lcmlbg.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250288/DOT_1090_oplyuh.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524787/untitled-2-6_gdnrpc.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524759/DSC_6875_m3wnps.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524744/DSC_2462_aw2d5h.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524685/untitled--32_yc9h38.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524647/untitled--27_xbiylj.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524613/untitled--29_tz2xps.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524495/untitled-70541_kozyea.jpg', title: '', location: '' },
    ],
  },
  {
    id: 'people',
    label: 'Exploration 04',
    title: 'People in Nature',
    subtitle: 'The human figure dwarfed by the wild',
    cover: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_1400,q_auto,f_auto/v1774336393/DSC_8996_x8hcof.jpg',
    description: 'Solitary figures against vast landscapes — a reminder of our place in the natural order. These images capture the quiet confrontation between human scale and wilderness.',
    photos: [
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774332839/%D7%9C%D7%91%D7%93_%D7%9E%D7%95%D7%9B%D7%9F_%D7%90%D7%99%D7%A0%D7%A1%D7%98%D7%92%D7%A8%D7%9D_Large_d9uve1.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774332835/nomoon_Large_ldfsmv.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774332831/untitled-7400_Large_tatjak.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774332826/6_Large_dfwpqw.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263920/IMG_8470_paasbc.png', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263613/ready_with_logo2_Large_nvufrg.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263611/ready_2_Large_s5smug.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263556/750_1897_Large_wtccu9.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774263547/750_5365_gbfiua.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262391/untitled-6215_Large_uckqko.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262378/IMG_0640_Large_n1ic8d.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262370/DSC_8353_Large_u0c5wj.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262342/750_3428_Large_j2db3e.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774262337/750_0242_Large_bcklql.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774251093/untitled-22020_yilux7.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774251021/IMG_2705_ystucf.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250420/DOT_4177_g9onsk.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250363/750_1362_ktktas.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250256/750_3468_cldhi5.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250237/%D7%9E%D7%AA%D7%A0%D7%93%D7%A0%D7%93%D7%99%D7%9D_%D7%91%D7%A8%D7%95%D7%97_-_%D7%93%D7%95%D7%AA%D7%9F_%D7%91%D7%A7_ij5fqn.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774250237/%D7%9B%D7%9C%D7%95%D7%90%D7%99%D7%9D_%D7%91%D7%AA%D7%95%D7%9A_%D7%A2%D7%A6%D7%9E%D7%A0%D7%95_-_%D7%93%D7%95%D7%AA%D7%9F_%D7%91%D7%A7_mcy6bq.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774336393/DSC_8996_x8hcof.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774336387/DSC_8396_qytt2z.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774336375/DSC_9218_bsz1mf.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774336368/DSC_9186-Edit_-_closeup_2_tpcvdf.png', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774336362/baa4996e-1791-4382-b2a8-57bf238ae23f_nlndhl.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774336356/fcd76f73-54aa-42d3-af29-ff5eee9ced21_uwv15q.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774336349/b5fe9989-dc7f-49bd-a7ba-693cb2c509c5_aiscw0.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774336343/4539897b-7cf0-4890-9d8c-e9c8be638c6b_hnigir.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774336336/1bb5afc9-8a1c-4b19-81ae-ed61bef73b4d_d5exu0.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774336331/3e37a3e3-e25d-4144-bada-0e5581be632f_ubbwrh.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524787/untitled-5576_1_ua2ltd.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524659/untitled-5676_wxvgrz.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524593/untitled-7263_hmkzjy.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524555/untitled-2034_iasa7m.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524559/DSC_6721_cpybtd.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524513/untitled-6050_w1iueo.jpg', title: '', location: '' },
      { src: 'https://res.cloudinary.com/diepbwdm5/image/upload/w_800,q_auto,f_auto/v1774524513/untitled-9497_vmoagz.jpg', title: '', location: '' },
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

        {/* Intimate — tall */}
        <ScrollReveal className="md:col-span-4" delay={0.1}>
          <div
            className="group relative overflow-hidden cursor-pointer aspect-square md:aspect-auto md:h-[700px]"
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

        {/* Landscape — wide */}
        <ScrollReveal className="md:col-span-7" delay={0.15}>
          <div
            className="group relative overflow-hidden cursor-pointer aspect-video md:aspect-auto md:h-[500px]"
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

/* ─── Seeded shuffle (deterministic per category so layout doesn't jump on re-render) ─── */
function seededShuffle(arr, seed) {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Masonry Gallery: JS-based shortest-column-first so order reads left→right, top→bottom ─── */
function MasonryGallery({ photos, startIndex, onPhotoClick, hasFeatured, pinnedCount = 3 }) {
  const gridPhotos = photos.slice(startIndex);
  const [colCount, setColCount] = useState(3);
  const [dimensions, setDimensions] = useState(null); // array of { w, h } per photo

  // Responsive column count
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setColCount(w <= 480 ? 1 : w <= 768 ? 2 : 3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Load image dimensions
  useEffect(() => {
    if (gridPhotos.length === 0) { setDimensions([]); return; }
    const results = new Array(gridPhotos.length).fill(null);
    let loaded = 0;
    gridPhotos.forEach((photo, i) => {
      const img = new Image();
      img.onload = () => {
        results[i] = { w: img.width, h: img.height };
        loaded++;
        if (loaded === gridPhotos.length) setDimensions([...results]);
      };
      img.onerror = () => {
        results[i] = { w: 4, h: 3 };
        loaded++;
        if (loaded === gridPhotos.length) setDimensions([...results]);
      };
      img.src = photo.src;
    });
  }, [gridPhotos.length, startIndex]);

  // Build display order: pinned first, then shuffled rest
  const displayOrder = React.useMemo(() => {
    const pinned = Math.min(pinnedCount, gridPhotos.length);
    if (gridPhotos.length <= pinned) return gridPhotos.map((_, i) => i);
    const first = Array.from({ length: pinned }, (_, i) => i);
    const rest = gridPhotos.slice(pinned).map((_, i) => i + pinned);
    const shuffledRest = seededShuffle(rest, gridPhotos.length * 7 + startIndex);
    return [...first, ...shuffledRest];
  }, [gridPhotos.length, startIndex, pinnedCount]);

  if (!dimensions) return null;

  // Distribute into columns using shortest-column-first (reads top→bottom, left→right)
  // Use a proportional gap relative to aspect ratios (10px gap ≈ 0.01 of typical column width)
  const gapUnit = 0.01;
  const columns = Array.from({ length: colCount }, () => ({ items: [], height: 0 }));

  displayOrder.forEach((photoIdx) => {
    const dim = dimensions[photoIdx] || { w: 4, h: 3 };
    const ratio = dim.h / dim.w;
    // Find the shortest column
    let shortest = 0;
    for (let c = 1; c < colCount; c++) {
      if (columns[c].height < columns[shortest].height) shortest = c;
    }
    columns[shortest].items.push(photoIdx);
    columns[shortest].height += ratio + gapUnit;
  });

  return (
    <section className={`${hasFeatured ? '' : 'mt-16'} mb-32`}>
      <style>{`
        @keyframes gridReveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="flex gap-[10px]">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex-1 flex flex-col gap-[10px]">
            {col.items.map((localIdx, itemIdx) => {
              const actualIdx = startIndex + localIdx;
              const photo = gridPhotos[localIdx];
              const animDelay = (colIdx + itemIdx * colCount) * 0.04;
              return (
                <div
                  key={actualIdx}
                  className="overflow-hidden cursor-pointer group relative"
                  style={{ animation: `gridReveal 0.5s ${animDelay}s both` }}
                  onClick={() => onPhotoClick(actualIdx)}
                >
                  <img
                    src={photo.src}
                    alt={photo.title || ''}
                    className="w-full block group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
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
          className="absolute top-6 left-8 md:left-16 flex items-center gap-2 bg-black/50 backdrop-blur-sm text-white/90 hover:bg-black/70 hover:text-white px-4 py-2 rounded-full transition-all group"
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

      {/* Featured section — triptych + full-width hero if category has it */}
      {category.featured && (
        <section className="mt-16">
          {/* Triptych row */}
          <div className="flex gap-2 md:gap-3 mb-2 md:mb-3" style={{ animation: 'gridReveal 0.6s 0s both' }}>
            {category.featured.triptych.map((src, i) => (
              <div key={i} className="flex-1 overflow-hidden cursor-pointer group" onClick={() => onPhotoClick(i)}>
                <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
            ))}
          </div>
          {/* Full-width hero */}
          <div className="overflow-hidden mb-2 md:mb-3 cursor-pointer group" style={{ animation: 'gridReveal 0.6s 0.15s both' }} onClick={() => onPhotoClick(3)}>
            <img src={category.featured.hero} alt="" className="w-full group-hover:scale-[1.02] transition-transform duration-700" />
          </div>
        </section>
      )}

      {/* Masonry gallery — natural aspect ratios, no cropping, shuffled order */}
      <MasonryGallery
        photos={category.photos}
        startIndex={category.featuredCount || 0}
        onPhotoClick={onPhotoClick}
        hasFeatured={!!category.featured}
        pinnedCount={category.pinnedCount || 3}
      />
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
