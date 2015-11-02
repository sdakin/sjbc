from django.forms import ModelForm, TextInput, RadioSelect, Textarea
from membership.sjbcMember import SjbcMember

class MemberForm(ModelForm):
    class Meta:
        model = SjbcMember
        fields = ['username', 'first_name', 'last_name', 'email', 'phone_number', 
            'type_of_cyclist', 'street_address', 'city', 'state', 'zip_code',
            'gender', 'date_of_birth', 'race_ethnicity', 'notes',
            'waiver_signed'
        ]
        widgets = {
            'username': TextInput(attrs={'size': 20, 'required': True}),
            'first_name': TextInput(attrs={'size': 20, 'required': True}),
            'last_name': TextInput(attrs={'size': 20, 'required': True}),
            'email': TextInput(attrs={'size': 20, 'required': True}),
            'phone_number': TextInput(attrs={'size': 15}),
            'type_of_cyclist':  RadioSelect(),
            'street_address': TextInput(attrs={'size': 30}),
            'city': TextInput(attrs={'size': 20}),
            'state': TextInput(attrs={'size': 2}),
            'zip_code': TextInput(attrs={'size': 5}),
            'race_ethnicity': TextInput(attrs={'size': 20}),
            'notes': Textarea(attrs={'rows': 4, 'cols': 80}),
        }

    # I'm not sure if this is the only or the right way to override a
    # field's default label but after a lot of trial and error it was
    # the only thing that worked.
    def __init__(self, *args, **kwargs):
        super(MemberForm, self).__init__(*args, **kwargs)
        self.fields['race_ethnicity'].label = "Race/ethnicity"
