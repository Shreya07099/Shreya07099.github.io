window.SITE = {
  name: "Shreya Nair",
  role: "Final-year student at VIT Vellore · mechanistic interpretability research",
  pitch:
    "Working on understanding why language models work the way they do",
  email: "shre0608@gmail.com",
  contactLead:
    "Open to conversations about mechanistic interpretability, representation geometry, and research collaborations.",
  cvUrl: "Shreya_Nair_CV.pdf",
  socials: [
    { label: "CV", href: "Shreya_Nair_CV.pdf" },
    { label: "GitHub", href: "https://github.com/Shreya07099" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shreya-nair-2171b4266/",
    },
    { label: "Email", href: "mailto:shre0608@gmail.com" },
  ],
  about: [
    "Hello! I am Shreya, a student in the final year of studies at Vellore Institute of Technology, currently trying to venture into the field of mechanistic interpretability. To be more precise, my interests lie specifically in the mechanisms of why: i.e., what happens inside the models when generating a certain output, rejecting a request, or changing the tone of a response midway through.",
    "Why am I interested in this? In general, I am interested in understanding how things work by disassembling them; however, language models have become the most fascinating objects I had to take apart. At the moment, my research mainly revolves around the topic of activation steering and analysis of hidden states using PyTorch, investigating the insides of a model, figuring out how they react to manipulation and what sort of experimentation could produce valid results.",
    "At least I hope my experiments do. I do strive to design them carefully, however, at this stage of my research journey I realize the amount of guidance I still need to improve, and would greatly appreciate any help from the people who are further along the road.",
    "So if you are conducting research in the same area, or are generally interested in the model's insides, please do reach out.",
  ],
  skills: [
    "Mechanistic interpretability",
    "Deep learning",
    "Machine learning",
    "PyTorch",
    "Python",
    "HuggingFace",
    "TransformerLens",
    "Causal inference",
    "NLP",
  ],
  projects: [
    {
      title:
        "Steering Under Momentum: Mid-Generation Affective Switches in Valence and Arousal",
      blurb:
        "If you change a language model's steering target halfway through generation, does the new signal overwrite the autoregressive momentum of text already steered another way? I reproduce a continuous valence-arousal subspace on Qwen3-1.7B, then use cached KV states on 130 emotion-neutral prompts to pair continuations that keep the original target with ones that flip it at tokens 12, 25, or 40 (of 50). A pull-score tracks alignment with the new target by layer and token. Direction of the switch is a strong predictor of success: positive valence and low arousal (the directions RLHF-style alignment prefers) are consistently easier to steer into than out of, and the gap grows when the switch is later. Valence biases concentrate in the deep third of the network; arousal also separates in mid-layers. Arousal vectors also track self-ratings less tightly than valence (R² ≈ 0.65 vs. 0.86), so some of that axis bias may be subspace noise.",
      tags: [
        "Mechanistic interpretability",
        "Qwen3-1.7B",
        "PyTorch",
        "Activation steering",
      ],
      paperUrl:
        "https://drive.google.com/file/d/119a1MJ3huv2r4gGfx6uvVvpcnOLR0D_R/view?usp=sharing",
      repoUrl:
        "https://github.com/Shreya07099/valence-arousal-representation-in-llms",
    },
  ],
};
